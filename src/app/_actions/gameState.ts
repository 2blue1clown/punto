"use server";

import {
  PlayerInfo,
  expireGameKeys,
  getUserColor,
  roomExists,
} from "./room";
import { broadcastToRoom } from "../api/pusher/pusher";
import { REDIS_GAME_KEY, db } from "../api/db/redis";
import { Color, RoomState } from "../_shared/gameLogic";
import { revalidatePath } from "next/cache";
import { drawCard} from "./deck";

export async function start(
  roomId: string,
  players: string[],
  formData: FormData
) {
  if (await !roomExists(roomId)) {
    throw new Error("Room does not exist");
  }

  await startGame(roomId, players);
  await broadcastToRoom(roomId, {
    action: "TURN_CHANGED",
  });

  revalidatePath(`/room/${roomId}`);
}

const COLORS = [Color.RED, Color.BLUE, Color.GREEN, Color.YELLOW];
const POSSIBLE_CARD_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9];




async function startGame(roomId: string, players: string[]) {
  
  const transaction = db.multi()
    .lpush(REDIS_GAME_KEY.orderList(roomId),...players)
    .sadd(REDIS_GAME_KEY.playerSet(roomId), ...players)
    .hset(REDIS_GAME_KEY.stateObject(roomId),{
      state:RoomState.PLAYING,
      turn:0
    })
    
  players.forEach((player,i) => {
    // init decks
    POSSIBLE_CARD_VALUES.forEach((value) => {
      transaction.sadd(REDIS_GAME_KEY.deck(roomId, player), `${value}`);
      transaction.sadd(REDIS_GAME_KEY.deck(roomId, player), `${value}a`);
    });
    // set colors
    transaction.set(REDIS_GAME_KEY.playerColor(roomId, player), COLORS[i]);
  })

  // show shows the issue... the result of this is that the players are repeated twice.
  await Promise.all([transaction.exec(),transaction.exec()]);

  await Promise.all([...players.map((player) => drawCard(roomId, player))]);
  await expireGameKeys(roomId);
}

export async function getPlayersInRoom(roomId: string) {
  return await db.smembers(REDIS_GAME_KEY.playerSet(roomId));
}

export async function getOrderOfRoom(roomId: string) {
  return await db.lrange(REDIS_GAME_KEY.orderList(roomId), 0, -1);
}

export async function getPlayerColors(roomId: string) {
  const players = await getOrderOfRoom(roomId);
  const colors: PlayerInfo[] = await Promise.all(
    players.map(async (player) => ({
      username: player,
      color: await getUserColor(roomId, player),
    }))
  );
  return colors;
}

export async function playerInRoom(roomId: string, username: string) {
  return (await db.sismember(REDIS_GAME_KEY.playerSet(roomId), username)) === 1;
}

export async function endGame(roomId: string) {
  await db.hset(REDIS_GAME_KEY.stateObject(roomId), {
    state: RoomState.FINISHED,
  });
}

export async function setWinner(roomId: string, username: string) {
  await db.hset(REDIS_GAME_KEY.stateObject(roomId), { winner: username });
}
export async function getWinner(roomId: string) {
  return (await db.hget(REDIS_GAME_KEY.stateObject(roomId), "winner")) as
    | string
    | null;
}

export async function getRoomState(roomId: string) {
  return (await db.hget(
    REDIS_GAME_KEY.stateObject(roomId),
    "state"
  )) as RoomState;
}

export async function nextTurn(roomId: string) {
  const turn = await db.hincrby(REDIS_GAME_KEY.stateObject(roomId), "turn", 1);
  return turn;
}

export async function getTurn(roomId: string) {
  const [turn, players] = await Promise.all([
    db.hget(REDIS_GAME_KEY.stateObject(roomId), "turn"),
    db.lrange(REDIS_GAME_KEY.orderList(roomId), 0, -1),
  ]);
  return players[(turn as number) % players.length];
}

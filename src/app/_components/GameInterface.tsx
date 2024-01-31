"use client";
import Board from "./board/Board";
import { BoardState, Card, PlaceDetails } from "../_shared/gameLogic";
import Hand from "./Hand";
import InviteLinkCard from "./cards/InviteLinkCard";
import { PlayerInfo } from "../_actions/room";
import PlayerRoomCard from "./cards/PlayerRoomCard";
import { cn } from "@/lib/utils";
import { useOptimistic } from "react";
import { PlacedCard, place } from "../_actions/place";

export default function GameInterface(props: {
  board?: PlaceDetails[][];
  player?: string;
  players?: PlayerInfo[];
  turn?: string;
  card?: Card;
  debug?: boolean;
  className?: string;
}) {
  const [optimisticBoard, addOptimisticCard] = useOptimistic(
    props.board,
    (state, newCard: PlacedCard) => {
      const newBoard = [...(state || [])];
      newBoard[newCard.y][newCard.x] = {
        card: { color: newCard.c, value: newCard.v },
      } as PlaceDetails;
      return newBoard;
    }
  );

  const [optimisticCard, blankCard] = useOptimistic(
    props.card,
    (state, newCard: undefined) => newCard
  );

  async function formAction(formData: FormData) {
    if (!props.card) return;
    const { x, y } = JSON.parse(formData.get("position") as string);
    addOptimisticCard({ c: props.card.color, v: props.card.value, x, y });
    blankCard(undefined);
    await place(x, y);
  }

  return (
    <div className="grid grid-rows-6 h-screen w-full md:aspect-square md:max-h-[100vw] md:max-w-[100vh] border border-red overflow-hidden">
      <div className="row-span-1 border w-full flex items-center justify-center">
        <Hand card={optimisticCard}></Hand>
      </div>
      <div className="border row-span-3 h-full max-h-[100vw] flex items-center justify-center">
        <Board
          formAction={formAction}
          board={optimisticBoard}
          debug={props.debug || false}
          card={optimisticCard}
        ></Board>
      </div>
      <div className="row-span-2 grid grid-cols-2 border w-full">
        {props.players &&
          props.players.length > 0 &&
          //make this responsive
          props.players.map((player, index) => (
            <div
              key={player.username}
              className={cn(
                "h-1/2",
                props.turn === player.username ? "ring" : "",
                index === 0 ? "col-start-1 row-start-1" : "",
                index === 1 ? "col-start-2 row-start-1" : "",
                index === 2 ? "col-start-2 row-start-1" : "",
                index === 3 ? "col-start-2 row-start-2" : ""
              )}
            >
              <PlayerRoomCard
                key={player.username}
                color={player.color}
                username={player.username}
                player={props.player}
              ></PlayerRoomCard>
            </div>
          ))}
      </div>
    </div>
  );
}

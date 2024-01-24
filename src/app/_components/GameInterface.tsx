import { MouseEventHandler } from "react";
import Board from "./board/Board";
import { BoardState, Card, Color } from "../_shared/gameLogic";
import Hand from "./Hand";
import { PlayerInfo } from "../events/gameEvents";
import PlayerRoomCard from "./cards/PlayerRoomCard";
import { cn } from "@/lib/utils";
import InviteLinkCard from "./cards/InviteLinkCard";

export default function GameInterface(props: {
  board?: BoardState;
  player?: string;
  players?: PlayerInfo[];
  turn?: string;
  card?: Card;
  handlePlacement: (x: number, y: number) => MouseEventHandler<HTMLDivElement>;
  debug?: boolean;
  className?: string;
}) {
  return (
    <div className="grid grid-rows-6 h-screen w-full md:aspect-square md:max-h-[100vw] md:max-w-[100vh] border border-red overflow-hidden">
      <div className="row-span-1 border w-full flex items-center justify-center">
        <Hand
          color={!props.card ? undefined : props.card.color}
          value={!props.card ? undefined : props.card.value}
        ></Hand>
      </div>
      {/* <div className="row-span-4 h-full flex flex-col items-center justify-center"> */}
      <div className="border row-span-3 h-full max-h-[100vw] flex items-center justify-center">
        <Board
          board={props.board}
          handlePlacement={props.handlePlacement}
          debug={props.debug || false}
        ></Board>
      </div>
      {/* </div> */}
      <div className="row-span-2 grid grid-cols-2 border w-full">
        {props.players && props.players.length > 0 && (
          //make this responsive
          <div>
            {props.players.map((player) => (
              <div
                key={player.username}
                className={cn(
                  "h-full",
                  props.turn === player.username ? "ring" : ""
                )}
              >
                <PlayerRoomCard
                  key={player.username}
                  color={player.color}
                  username={player.username}
                ></PlayerRoomCard>
              </div>
            ))}
          </div>
        )}
        <InviteLinkCard></InviteLinkCard>
        <InviteLinkCard></InviteLinkCard>
        <InviteLinkCard></InviteLinkCard>
      </div>
    </div>
  );
}

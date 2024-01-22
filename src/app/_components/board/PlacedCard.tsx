import { Color } from "@/app/_shared/gameLogic";
import { cn } from "@/lib/utils";
import { MouseEventHandler } from "react";

export default function PlacedCard(props: {
  value: number;
  color: Color;
  onClick?: MouseEventHandler<HTMLDivElement>;
}) {
  switch (props.value) {
    case 1:
      return (
        <Grid onClick={props.onClick}>
          <Dot color={props.color} className="col-start-2 row-start-2"></Dot>
        </Grid>
      );
    case 2:
      return (
        <Grid>
          <Dot color={props.color} className="col-start-1 row-start-1"></Dot>
          <Dot color={props.color} className="col-start-3 row-start-3"></Dot>
        </Grid>
      );
    case 3:
      return (
        <Grid>
          <Dot color={props.color} className="col-start-1 row-start-1"></Dot>
          <Dot color={props.color} className="col-start-2 row-start-2"></Dot>
          <Dot color={props.color} className="col-start-3 row-start-3"></Dot>
        </Grid>
      );
    case 4:
      return (
        <Grid>
          <Dot color={props.color} className="col-start-1 row-start-1"></Dot>
          <Dot color={props.color} className="col-start-1 row-start-3"></Dot>
          <Dot color={props.color} className="col-start-3 row-start-1"></Dot>
          <Dot color={props.color} className="col-start-3 row-start-3"></Dot>
        </Grid>
      );
    case 5:
      return (
        <Grid>
          <Dot color={props.color} className="col-start-1 row-start-1"></Dot>
          <Dot color={props.color} className="col-start-1 row-start-3"></Dot>
          <Dot color={props.color} className="col-start-3 row-start-1"></Dot>
          <Dot color={props.color} className="col-start-3 row-start-3"></Dot>
          <Dot color={props.color} className="col-start-2 row-start-2"></Dot>
        </Grid>
      );
    case 6:
      return (
        <Grid>
          <Dot color={props.color} className="col-start-1 row-start-1"></Dot>
          <Dot color={props.color} className="col-start-1 row-start-3"></Dot>
          <Dot color={props.color} className="col-start-3 row-start-1"></Dot>
          <Dot color={props.color} className="col-start-3 row-start-3"></Dot>
          <Dot color={props.color} className="col-start-1 row-start-2"></Dot>
          <Dot color={props.color} className="col-start-3 row-start-2"></Dot>
        </Grid>
      );
    case 7:
      return (
        <Grid>
          <Dot color={props.color} className="col-start-1 row-start-1"></Dot>
          <Dot color={props.color} className="col-start-1 row-start-3"></Dot>
          <Dot color={props.color} className="col-start-3 row-start-1"></Dot>
          <Dot color={props.color} className="col-start-3 row-start-3"></Dot>
          <Dot color={props.color} className="col-start-1 row-start-2"></Dot>
          <Dot color={props.color} className="col-start-3 row-start-2"></Dot>
          <Dot color={props.color} className="col-start-2 row-start-2"></Dot>
        </Grid>
      );
    case 8:
      return (
        <Grid>
          <Dot color={props.color} className="col-start-1 row-start-1"></Dot>
          <Dot color={props.color} className="col-start-1 row-start-3"></Dot>
          <Dot color={props.color} className="col-start-3 row-start-1"></Dot>
          <Dot color={props.color} className="col-start-3 row-start-3"></Dot>
          <Dot color={props.color} className="col-start-1 row-start-2"></Dot>
          <Dot color={props.color} className="col-start-3 row-start-2"></Dot>
          <Dot color={props.color} className="col-start-2 row-start-1"></Dot>
          <Dot color={props.color} className="col-start-2 row-start-3"></Dot>
        </Grid>
      );
    case 9:
      return (
        <Grid>
          <Dot color={props.color} className="col-start-1 row-start-1"></Dot>
          <Dot color={props.color} className="col-start-1 row-start-3"></Dot>
          <Dot color={props.color} className="col-start-3 row-start-1"></Dot>
          <Dot color={props.color} className="col-start-3 row-start-3"></Dot>
          <Dot color={props.color} className="col-start-1 row-start-2"></Dot>
          <Dot color={props.color} className="col-start-3 row-start-2"></Dot>
          <Dot color={props.color} className="col-start-2 row-start-1"></Dot>
          <Dot color={props.color} className="col-start-2 row-start-3"></Dot>
          <Dot color={props.color} className="col-start-2 row-start-2"></Dot>
        </Grid>
      );
    default:
      return null;
  }
}

function Grid(props: {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      className={cn(
        "aspect-square bg-black hover:bg-gray-800 grid grid-cols-3 gap-1 p-1 grid-rows-3 rounded-lg"
      )}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}

function Dot(props: { color: Color; className: string }) {
  return (
    <div
      className={cn(
        "aspect-square rounded-full",
        props.className,
        props.color === Color.RED ? "bg-red-400" : "",
        props.color === Color.GREEN ? "bg-green-400" : "",
        props.color === Color.BLUE ? "bg-blue-400" : "",
        props.color === Color.YELLOW ? "bg-yellow-400" : ""
      )}
    ></div>
  );
}
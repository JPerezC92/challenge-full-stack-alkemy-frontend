import { MovementType } from "./MovementType";

interface MovementProps {
  id: string;
  concept: string;
  amount: number;
  date: string;
  type: MovementType;
}

export class Movement {
  public readonly id: string;
  public readonly concept: string;
  public readonly amount: number;
  public readonly date: string;
  public readonly type: MovementType;

  constructor(props: MovementProps) {
    this.id = props.id;
    this.concept = props.concept;
    this.amount = props.amount;
    this.date = props.date;
    this.type = props.type;
  }
}

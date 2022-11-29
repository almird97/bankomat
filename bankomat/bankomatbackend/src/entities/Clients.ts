import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("pin", ["pin"], { unique: true })
@Entity("clients", { schema: "bankomat" })
export class Clients {
  @PrimaryGeneratedColumn({ type: "int", name: "client_id", unsigned: true })
  clientId: number;

  @Column("varchar", {
    name: "pin",
    unique: true,
    length: 50,
    default: () => "'1234'",
  })
  pin: string;

  @Column("int", { name: "novac", default: () => "'0'" })
  novac: number;

  @Column("enum", {
    name: "aktivan",
    enum: ["DA", "NE"],
    default: () => "'DA'",
  })
  aktivan: "DA" | "NE";
}

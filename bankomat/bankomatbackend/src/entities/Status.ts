import { Column, Entity } from "typeorm";

@Entity("status", { schema: "bankomat" })
export class Status {
  @Column("enum", {
    name: "aktivan",
    enum: ["DA", "NE"],
    default: () => "'DA'",
  })
  aktivan: "DA" | "NE";

  @Column("int", { name: "novac", default: () => "'0'" })
  novac: number;

  @Column("int", { name: "brojisplata", default: () => "'0'" })
  brojisplata: number;

  @Column("varchar", {
    primary: true,
    name: "password",
    nullable: true,
    length: 50,
    default: () => "'0123456789'",
  })
  password: string | null;
}

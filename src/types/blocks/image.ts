export interface IImageBlock {
  id: string;
  src: string;
  alignment: "left" | "center" | "right";
  width: "auto" | "100%" | number;
  height: "auto" | "100%" | number;
}

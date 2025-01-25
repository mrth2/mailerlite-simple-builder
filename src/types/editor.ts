import type { IImageBlock, ITextBlock } from "./blocks";

type TBlockType = "text" | "image";
type TBlockData = ITextBlock | IImageBlock;

export interface IEditorBlock {
  id: string;
  type: TBlockType;
  data: TBlockData;
}
export interface IEditorData {
  blocks: IEditorBlock[];
}

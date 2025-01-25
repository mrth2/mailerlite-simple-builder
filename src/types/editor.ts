import type { IImageBlock, ITextBlock } from "./blocks";

export interface IEditorBlockText {
  id: string;
  type: "text";
  data: ITextBlock;
}
export interface IEditorBlockImage {
  id: string;
  type: "image";
  data: IImageBlock;
}

export type IEditorBlock = IEditorBlockText | IEditorBlockImage;
export interface IEditorData {
  blocks: IEditorBlock[];
}

import type { IImageBlock, ITextBlock } from "./blocks";

export interface IEditorBlockText {
  id: string;
  type: "text";
  data: ITextBlock;
  isPreview?: boolean;
}
export interface IEditorBlockImage {
  id: string;
  type: "image";
  data: IImageBlock;
  isPreview?: boolean;
}

export type IEditorBlock = IEditorBlockText | IEditorBlockImage;
export interface IEditorData {
  blocks: IEditorBlock[];
}

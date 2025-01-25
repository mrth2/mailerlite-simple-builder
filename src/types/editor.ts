import type { IImageBlock, ITextBlock } from "./blocks";

export type IEditorBlock =
  | {
      id: string;
      type: "text";
      data: ITextBlock;
    }
  | {
      id: string;
      type: "image";
      data: IImageBlock;
    };
export interface IEditorData {
  blocks: IEditorBlock[];
}

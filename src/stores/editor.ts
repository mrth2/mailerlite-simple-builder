import type {
  IEditorBlock,
  IEditorData,
  IImageBlock,
  ITextBlock,
} from "@/types";
import { acceptHMRUpdate, defineStore } from "pinia";

export const useEditorStore = defineStore("editor", {
  state: () => ({
    data: null as IEditorData | null,
  }),
  getters: {
    blocks: (state) => state.data?.blocks ?? [],
  },
  actions: {
    initialize() {
      this.data = {
        blocks: [],
      };
    },
    // add a new block to the list
    addBlock(block: IEditorBlock) {
      if (!this.data) return;
      this.data.blocks.push(block);
    },
    // remove a block from the list
    removeBlock(blockId: string) {
      if (!this.data) return;
      const index = this.data.blocks.findIndex((block) => block.id === blockId);
      if (index < 0) return;
      this.data.blocks.splice(index, 1);
    },
    // reorder blocks in the list by swapping them
    reorderBlocks(sourceIndex: number, destinationIndex: number) {
      if (!this.data) return;
      const [removed] = this.data.blocks.splice(sourceIndex, 1);
      this.data.blocks.splice(destinationIndex, 0, removed);
    },
    // update block data by id
    updateBlock(blockId: string, data: ITextBlock | IImageBlock) {
      if (!this.data) return;
      const index = this.data.blocks.findIndex((b) => b.id === blockId);
      if (index < 0) return;
      this.data.blocks[index].data = data;
    },
    // init a dragging block data when start dragging from side menu
    generateEmptyBlock(type: IEditorBlock["type"]): IEditorBlock {
      const id = `block-${Date.now()}`;
      if (type === "text") {
        return {
          id,
          type,
          data: this.generateEmptyTextBlock(),
        };
      } else {
        return {
          id: `block-${Date.now()}`,
          type,
          data: this.generateEmptyImageBlock(),
        };
      }
    },
    generateEmptyTextBlock(): ITextBlock {
      return {
        id: `text-${Date.now()}`,
        content: "Feel free to type something here...",
        textAlign: "left",
        fontSize: 16,
        fontFamily: "var(--font-family)",
        color: "var(--color-primary)",
      };
    },
    generateEmptyImageBlock(): IImageBlock {
      return {
        id: `image-${Date.now()}`,
        src: "",
        alignment: "center",
        width: "100%",
        height: "auto",
      };
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEditorStore, import.meta.hot));
}

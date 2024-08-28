"use client";

import { useCreateBlockNote } from "@blocknote/react";

import "@/components/editorStyle/styles.css";
import { useEdgeStore } from "@/lib/edgestore";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file,
    });

    return response.url;
  };

  const editor: BlockNoteEditor | null = useCreateBlockNote({
    // Sets attributes on DOM elements in the editor.
    domAttributes: {
      // Adds a class to all `blockContainer` elements.
      block: {
        class: "block",
      },
    },
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: handleUpload,
  });

  return (
    <BlockNoteView
      onChange={() => onChange(JSON.stringify(editor.topLevelBlocks, null, 2))}
      editable={editable}
      editor={editor}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    ></BlockNoteView>
  );
};

export default Editor;

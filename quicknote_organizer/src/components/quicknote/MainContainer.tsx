import {
  component$,
  useSignal,
  useStore,
  $,
} from "@builder.io/qwik";

/**
 * Main Container for QuickNote Organizer.
 * Provides UI for creating, editing, deleting, searching, and categorizing notes.
 * Features: Light theme, primary/accent color scheme.
 *
 * Layout:
 *   - Sidebar for categories
 *   - Topbar with search
 *   - List of Note cards
 *   - Floating Action Button (FAB) for new note creation
 */

// Theme colors
const COLORS = {
  primary: "#4A90E2",
  secondary: "#FFFFFF",
  accent: "#F5A623",
  text: "#222",
  background: "#F7F9FB"
};

// Note and Category Interfaces
interface Note {
  id: number;
  title: string;
  content: string;
  category: string;
  lastEdited: number;
}

interface Category {
  name: string;
  color: string;
}

// Default categories
const defaultCategories: Category[] = [
  { name: "All", color: COLORS.primary },
  { name: "Personal", color: "#7ED957" },
  { name: "Work", color: "#F5A623" },
  { name: "Ideas", color: "#4A90E2" },
];

// PUBLIC_INTERFACE
export default component$(() => {
  // State
  const categories = useStore<Category[]>([...defaultCategories]);
  const notes = useStore<Note[]>([]);
  const filter = useSignal("");
  const activeCategory = useSignal("All");
  const showNoteDialog = useSignal(false);
  const dialogMode = useSignal<"create" | "edit">("create");
  const editingNote = useSignal<Note | null>(null);

  // New/edit note data
  const noteDraft = useStore<{ title: string; content: string }>({
    title: "",
    content: ""
  });

  // PUBLIC_INTERFACE
  const openCreateDialog = $(() => {
    dialogMode.value = "create";
    noteDraft.title = "";
    noteDraft.content = "";
    editingNote.value = null;
    showNoteDialog.value = true;
  });

  // PUBLIC_INTERFACE
  const openEditDialog = $((note: Note) => {
    dialogMode.value = "edit";
    noteDraft.title = note.title;
    noteDraft.content = note.content;
    editingNote.value = note;
    showNoteDialog.value = true;
  });

  // PUBLIC_INTERFACE
  const saveNote = $(() => {
    if (dialogMode.value === "create" && noteDraft.title.trim()) {
      notes.push({
        id: Date.now(),
        title: noteDraft.title,
        content: noteDraft.content,
        category: activeCategory.value || "All",
        lastEdited: Date.now()
      });
    } else if (
      dialogMode.value === "edit" &&
      editingNote.value &&
      noteDraft.title.trim()
    ) {
      const idx = notes.findIndex((n) => n.id === editingNote.value!.id);
      if (idx !== -1) {
        notes[idx] = {
          ...notes[idx],
          title: noteDraft.title,
          content: noteDraft.content,
          lastEdited: Date.now()
        };
      }
    }
    showNoteDialog.value = false;
    noteDraft.title = "";
    noteDraft.content = "";
    editingNote.value = null;
  });

  // PUBLIC_INTERFACE
  const deleteNote = $((id: number) => {
    const idx = notes.findIndex((n) => n.id === id);
    if (idx !== -1) {
      notes.splice(idx, 1);
    }
  });

  // PUBLIC_INTERFACE
  const filterNotes = () => {
    return notes.filter((note) => {
      if (activeCategory.value !== "All" && note.category !== activeCategory.value)
        return false;
      if (
        filter.value &&
        !(
          note.title.toLowerCase().includes(filter.value.toLowerCase()) ||
          note.content.toLowerCase().includes(filter.value.toLowerCase())
        )
      ) {
        return false;
      }
      return true;
    });
  };

  // PUBLIC_INTERFACE
  const selectCategory = $((cat: string) => {
    activeCategory.value = cat;
    filter.value = "";
  });

  // PUBLIC_INTERFACE
  const handleDialogClose = $(() => {
    showNoteDialog.value = false;
    noteDraft.title = "";
    noteDraft.content = "";
    editingNote.value = null;
  });

  // Layout
  return (
    <div style={{
      display: "flex",
      minHeight: "80vh",
      background: COLORS.background,
      color: COLORS.text,
      fontFamily: "Segoe UI, Arial, sans-serif"
    }}>
      {/* Sidebar */}
      <aside style={{
        width: "180px",
        background: COLORS.secondary,
        borderRight: `1px solid #e6e6e6`,
        padding: "24px 0 0 0",
        boxShadow: "0 2px 8px 0 rgba(0,0,0,0.02)",
        display: "flex",
        flexDirection: "column",
        gap: "8px"
      }}>
        <div style={{ fontWeight: "bold", textAlign: "center", marginBottom: 12 }}>
          Categories
        </div>
        {categories.map((cat) => (
          <button
            key={cat.name}
            style={{
              border: "none",
              background:
                activeCategory.value === cat.name
                  ? COLORS.primary
                  : COLORS.secondary,
              color:
                activeCategory.value === cat.name
                  ? "#fff"
                  : COLORS.text,
              padding: "10px 0",
              margin: "0 18px",
              borderRadius: 7,
              fontWeight:
                activeCategory.value === cat.name ? 700 : 400,
              transition: "all 0.2s",
              marginBottom: "4px",
              cursor: "pointer"
            }}
            onClick$={() => selectCategory(cat.name)}
          >
            <span
              style={{
                display: "inline-block",
                width: 11,
                height: 11,
                borderRadius: "100%",
                background: cat.color,
                marginRight: 8,
                verticalAlign: "middle"
              }}
            ></span>
            {cat.name}
          </button>
        ))}
      </aside>

      {/* Main content area */}
      <main style={{
        flex: 1,
        padding: "28px 28px 64px 28px",
        position: "relative",
        minWidth: 0,
        overflow: "auto"
      }}>
        {/* Search bar */}
        <div style={{
          width: "100%",
          marginBottom: "22px",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}>
          <input
            type="text"
            placeholder="Search notes..."
            style={{
              width: "100%",
              padding: "12px 16px",
              border: "1px solid #d7d7e0",
              borderRadius: 8,
              fontSize: "1rem",
              background: "#fff"
            }}
            value={filter.value}
            onInput$={(ev) =>
              (filter.value = (ev.target as HTMLInputElement).value)
            }
          />
        </div>

        {/* List of notes */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px"
          }}
        >
          {filterNotes().length === 0 ? (
            <span style={{
              color: "#b7b7b7",
              fontSize: "1.1rem",
              margin: "44px 0",
              width: "100%",
              textAlign: "center"
            }}>
              No notes found.
            </span>
          ) : (
            filterNotes().map((note) => (
              <div
                key={note.id}
                style={{
                  background: COLORS.secondary,
                  borderRadius: 12,
                  boxShadow:
                    "0 2px 6px 0 rgba(74,144,226,0.07), 0 1.5px 3px 0 rgba(245,166,35,0.04)",
                  width: "290px",
                  minHeight: "160px",
                  padding: "18px 16px 13px 19px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative"
                }}
              >
                {/* Note category indicator */}
                <span style={{
                  position: "absolute",
                  top: 6,
                  right: 10,
                  padding: "2.5px 10px",
                  borderRadius: "10px",
                  background: "#f6f7fa",
                  fontSize: "0.75rem",
                  color: "#455",
                  fontWeight: 600,
                  letterSpacing: ".03em"
                }}>
                  {note.category}
                </span>
                <div style={{
                  fontWeight: 600,
                  fontSize: "1.11rem",
                  marginBottom: 7,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}>{note.title}</div>
                <div style={{
                  color: "#434248",
                  fontSize: ".98rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  marginBottom: 12
                }}>
                  {note.content.length > 90
                    ? note.content.substring(0, 88) + "…"
                    : note.content}
                </div>
                <div style={{
                  marginTop: "auto",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <span style={{
                    fontSize: "0.72rem",
                    color: "#B2B2B2"
                  }}>
                    {new Date(note.lastEdited).toLocaleDateString()}
                  </span>
                  {/* Context menu: Edit and Delete */}
                  <span>
                    <button
                      style={{
                        border: "none",
                        background: "none",
                        color: COLORS.primary,
                        fontWeight: 600,
                        cursor: "pointer",
                        marginRight: 7
                      }}
                      onClick$={() => openEditDialog(note)}
                      title="Edit"
                    >✏️</button>
                    <button
                      style={{
                        border: "none",
                        background: "none",
                        color: COLORS.accent,
                        fontWeight: 700,
                        cursor: "pointer"
                      }}
                      onClick$={() => deleteNote(note.id)}
                      title="Delete"
                    >🗑️</button>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Floating Action Button for Add Note */}
        <button
          style={{
            position: "fixed",
            bottom: "38px",
            right: "42px",
            width: "68px",
            height: "68px",
            background: COLORS.primary,
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            boxShadow:
              "0 2px 12px 0 rgba(74,144,226,0.14), 0 2.5px 6px 0 rgba(245,166,35,0.10)",
            fontSize: "2.2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            cursor: "pointer"
          }}
          title="Add new note"
          onClick$={openCreateDialog}
        >
          +
        </button>

        {/* Dialog for Create/Edit Note */}
        {showNoteDialog.value && (
          <div style={{
            position: "fixed",
            left: 0, top: 0, width: "100vw", height: "100vh",
            display: "flex",
            background: "rgba(60,60,60,0.16)",
            alignItems: "center", justifyContent: "center",
            zIndex: 1000
          }}>
            <div style={{
              minWidth: "340px",
              maxWidth: "90vw",
              background: "#fff",
              borderRadius: 14,
              boxShadow: "0 5px 28px rgba(0,0,0,0.10)",
              padding: "28px 28px 18px 28px",
              display: "flex",
              flexDirection: "column",
            }}>
              <div style={{ fontWeight: 600, fontSize: "1.13rem", marginBottom: 14 }}>
                {dialogMode.value === "create" ? "Create Note" : "Edit Note"}
              </div>
              <input
                type="text"
                value={noteDraft.title}
                onInput$={(ev) => {
                  noteDraft.title = (ev.target as HTMLInputElement).value;
                }}
                placeholder="Title"
                maxLength={64}
                style={{
                  marginBottom: 11,
                  padding: "11px 12px",
                  border: "1px solid #d4dde5",
                  borderRadius: 6,
                  fontSize: "1.05rem",
                  outline: "none"
                }}
              />
              <textarea
                value={noteDraft.content}
                onInput$={(ev) => {
                  noteDraft.content = (ev.target as HTMLTextAreaElement).value;
                }}
                placeholder="Write your note..."
                rows={6}
                maxLength={800}
                style={{
                  marginBottom: 14,
                  border: "1px solid #d4dde5",
                  borderRadius: 6,
                  padding: "11px 12px",
                  fontFamily: "inherit",
                  fontSize: "1rem",
                  resize: "vertical"
                }}
              />
              <div style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 13
              }}>
                <button
                  style={{
                    background: COLORS.secondary,
                    color: COLORS.primary,
                    border: "1px solid #cbe1fc",
                    borderRadius: 6,
                    padding: "8px 17px",
                  }}
                  onClick$={handleDialogClose}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  style={{
                    background: COLORS.primary,
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    padding: "8px 18px",
                    fontWeight: 600,
                  }}
                  disabled={!noteDraft.title.trim()}
                  onClick$={saveNote}
                  type="button"
                >
                  {dialogMode.value === "create" ? "Create" : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
});

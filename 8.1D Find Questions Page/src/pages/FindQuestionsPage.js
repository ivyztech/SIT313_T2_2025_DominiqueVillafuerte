import React, { useEffect, useMemo, useState } from "react";
import { Card, Container, Input, Dropdown, Button, Icon } from "semantic-ui-react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../auth/AuthContext";
import { deleteDoc, doc } from "firebase/firestore";
import dayjs from "dayjs";

const DATE_OPTIONS = [
  { key: "all", text: "All time", value: "all" },
  { key: "7", text: "Last 7 days", value: "7" },
  { key: "30", text: "Last 30 days", value: "30" },
];

export default function FindQuestionsPage() {
  const [raw, setRaw] = useState([]);
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [dateRange, setDateRange] = useState("all");
  const [expanded, setExpanded] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const q = query(
      collection(db, "posts"),
      where("type", "==", "question"),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setRaw(rows);
    });
    return () => unsub();
  }, []);

  const allTags = useMemo(() => {
    const s = new Set();
    raw.forEach(r => (r.tags || []).forEach(t => s.add(t)));
    return [...s].sort().map(t => ({ key: t, text: t, value: t }));
  }, [raw]);

  const filtered = useMemo(() => {
    let rows = raw;

    if (search.trim()) {
      const s = search.trim().toLowerCase();
      rows = rows.filter(r =>
        (r.title || "").toLowerCase().includes(s) ||
        (r.description || "").toLowerCase().includes(s)
      );
    }

    if (tag) {
      rows = rows.filter(r => (r.tags || []).includes(tag));
    }

    if (dateRange !== "all") {
      const days = parseInt(dateRange, 10);
      const cutoff = dayjs().subtract(days, "day");
      rows = rows.filter(r => r.createdAt?.toDate && dayjs(r.createdAt.toDate()).isAfter(cutoff));
    }

    return rows;
  }, [raw, search, tag, dateRange]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this question?")) return;
    await deleteDoc(doc(db, "posts", id));
  };

  return (
    <Container style={{ paddingTop: 24, paddingBottom: 40 }}>
      <h1 style={{ color: "#0052cc" }}>Find Questions</h1>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
        <Input
          icon="search"
          placeholder="Search by title or description..."
          value={search}
          onChange={(e, { value }) => setSearch(value)}
          style={{ minWidth: 280 }}
        />
        <Dropdown
          placeholder="Filter by tag"
          selection
          clearable
          options={allTags}
          value={tag}
          onChange={(_, { value }) => setTag(value)}
          style={{ minWidth: 200 }}
        />
        <Dropdown
          placeholder="Date"
          selection
          options={DATE_OPTIONS}
          value={dateRange}
          onChange={(_, { value }) => setDateRange(value)}
          style={{ minWidth: 160 }}
        />
      </div>

      <Card.Group itemsPerRow={3} stackable>
        {filtered.map((q) => {
          const isOwner = user?.uid && user.uid === q.authorUid;
          const isOpen = expanded === q.id;
          const created = q.createdAt?.toDate ? dayjs(q.createdAt.toDate()).format("DD MMM YYYY") : "—";

          return (
            <Card key={q.id} raised>
              <Card.Content onClick={() => setExpanded(isOpen ? null : q.id)} style={{ cursor: "pointer" }}>
                <Card.Header>{q.title}</Card.Header>
                <Card.Meta>{created}</Card.Meta>
                <Card.Description>
                  {isOpen ? q.description : (q.description || "").slice(0, 120) + ((q.description || "").length > 120 ? "…" : "")}
                </Card.Description>
                <div style={{ marginTop: 8 }}>
                  {(q.tags || []).map((t) => (
                    <span key={t} style={{ background: "#eef3ff", color: "#0052cc", padding: "4px 8px", borderRadius: 12, marginRight: 6, fontSize: 12 }}>
                      #{t}
                    </span>
                  ))}
                </div>
              </Card.Content>
              {isOwner && (
                <Card.Content extra>
                  <Button negative icon labelPosition="left" onClick={() => handleDelete(q.id)}>
                    <Icon name="trash" /> Delete
                  </Button>
                </Card.Content>
              )}
            </Card>
          );
        })}
      </Card.Group>
    </Container>
  );
}

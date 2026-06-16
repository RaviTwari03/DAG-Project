from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Any
from collections import deque

app = FastAPI()

# ── CORS ──────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Pydantic models ───────────────────────────────────────────
class PipelineRequest(BaseModel):
    nodes: List[Any]
    edges: List[Any]


class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool


# ── DAG detection via Kahn's algorithm ────────────────────────
def compute_is_dag(nodes: list, edges: list) -> bool:
    """
    Returns True iff the directed graph formed by `nodes` and `edges`
    is a DAG (contains no directed cycle).

    Uses Kahn's algorithm (topological sort by in-degree reduction).
    An empty graph is considered a DAG.
    """
    if len(nodes) == 0:
        return True

    # Build node ID set (guard against non-dict nodes)
    node_ids = {
        n["id"]
        for n in nodes
        if isinstance(n, dict) and "id" in n
    }

    if not node_ids:
        return True

    # Build adjacency list and in-degree map
    in_degree = {nid: 0 for nid in node_ids}
    adjacency = {nid: [] for nid in node_ids}

    for edge in edges:
        if not isinstance(edge, dict):
            continue
        src = edge.get("source")
        tgt = edge.get("target")
        # Only count edges between known nodes
        if src in node_ids and tgt in node_ids:
            adjacency[src].append(tgt)
            in_degree[tgt] += 1

    # BFS from all zero-in-degree nodes
    queue = deque(nid for nid, deg in in_degree.items() if deg == 0)
    processed = 0

    while queue:
        node = queue.popleft()
        processed += 1
        for neighbor in adjacency[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # If we processed every node, no cycle exists → is a DAG
    return processed == len(node_ids)


# ── Routes ────────────────────────────────────────────────────
@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse", response_model=PipelineResponse)
def parse_pipeline(pipeline: PipelineRequest):
    """
    Accepts a pipeline (nodes + edges) and returns:
      - num_nodes: count of nodes
      - num_edges: count of edges
      - is_dag:    whether the graph is a directed acyclic graph
    """
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag = compute_is_dag(pipeline.nodes, pipeline.edges)

    return PipelineResponse(
        num_nodes=num_nodes,
        num_edges=num_edges,
        is_dag=is_dag,
    )

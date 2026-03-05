package labyrinth;

import java.util.ArrayList;
import java.util.Collections;

public class LabyrinthGenerator {
    
    /**
     * Helper class for disjoint-set data structure.
     */
    private static class DSU {
        
        private int[] parent, size;
        
        private DSU(int n) {
            parent = new int[n];
            size = new int[n];
            for (int i = 0; i < n; i++) {
                parent[i] = i;
                size[i] = 1;
            }
        }
        
        /**
         * Finds the representative of the set where x is in.
         * @param x
         * @return the representative
         */
        public int find(int x) {
            return parent[x] == x ? x : (parent[x] = find(parent[x]));
        }
        
        /**
         * Unites the sets containing x and y.
         * @param x
         * @param y
         * @return true if x and y were in different sets, false otherwise
         */
        public boolean unite(int x, int y) {
            x = find(x);
            y = find(y);
            if (x == y) return false;
            if (size[x] < size[y]) {
                parent[x] = y;
                size[y] += size[x];
            } else {
                parent[y] = x;
                size[x] += size[y];
            }
            return true;
        }
        
    }
    
    /**
     * Converts p into an integer.
     * @param p
     * @param size
     * @return
     */
    private static int posToInt(Position p, int size) {
        return p.x * size + p.y;
    }
    
    /**
     * Generates a random Labyrinth based on the following method:
     * https://en.wikipedia.org/wiki/Maze_generation_algorithm#Iterative_randomized_Kruskal's_algorithm_(with_sets)
     * @param size size of the labyrinth
     * @return generated labyrinth
     */
    public static Labyrinth generate(int size) {
        Labyrinth labyrinth = new Labyrinth(size);
        ArrayList<Position> edges = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                if (i % 2 == 1 || j % 2 == 1) {
                    labyrinth.buildWall(new Position(i, j));
                    if (i % 2 == 0 || j % 2 == 0) {
                        edges.add(new Position(i, j));
                    }
                }
            }
        }
        Collections.shuffle(edges);
        DSU dsu = new DSU(size * size);
        for (Position edge : edges) {
            Position u, v;
            if (edge.x % 2 == 1) {
                u = edge.move(Direction.UP);
                v = edge.move(Direction.DOWN);
            } else {
                u = edge.move(Direction.LEFT);
                v = edge.move(Direction.RIGHT);
            }
            if (dsu.unite(posToInt(u, size), posToInt(v, size))) {
                labyrinth.destroyWall(edge);
            }
            
        }
        return labyrinth;
    }
    
}
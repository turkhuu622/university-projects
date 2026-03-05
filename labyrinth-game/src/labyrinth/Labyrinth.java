package labyrinth;

public class Labyrinth {
    
    private final boolean[][] labyrinth;
    
    public Labyrinth(int size) {
        this.labyrinth = new boolean[size][size];
    }
    
    public boolean[][] getLabyrinth() {
        return labyrinth;
    }
    
    /**
     * Destroys the wall at p or does nothing if there is not a wall
     * @param p position
     */
    public void destroyWall(Position p) {
        labyrinth[p.x][p.y] = false;
    }
    
    /**
     * Builds a wall at p or does nothing if there is a wall
     * @param p position
     */
    public void buildWall(Position p) {
        labyrinth[p.x][p.y] = true;
    }
    
    /**
     * @param p position
     * @return true if there is a wall at p, false otherwise
     */
    public boolean isWall(Position p) {
        return labyrinth[p.x][p.y];
    }
    
}
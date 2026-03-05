package labyrinth;

public class Position {
    
    public final int x;
    public final int y;
    
    public Position(int x, int y) {
        this.x = x;
        this.y = y;
    }

    /**
     * 
     * @param d
     * @return the position after moving by d
     */
    public Position move(Position d) {
        return new Position(x + d.x, y + d.y);
    }
    
    /**
     * 
     * @param d
     * @return the position after moving in direction d
     */
    public Position move(Direction d) {
        return move(d.moveDelta);
    }
    
    /**
     * 
     * @param p
     * @return the distance to p
     */
    public int distance(Position p) {
        return Math.abs(x - p.x) + Math.abs(y - p.y);
    }

    @Override
    public int hashCode() {
        int hash = 7;
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Position other = (Position) obj;
        if (this.x != other.x) {
            return false;
        }
        return this.y == other.y;
    }
    
}
package labyrinth;

public enum Direction {
    
    LEFT(0, -1), RIGHT(0, 1), UP(-1, 0), DOWN(1, 0);
    
    public final Position moveDelta;
    
    Direction(int dx, int dy) {
        moveDelta = new Position(dx, dy);
    }
    
}
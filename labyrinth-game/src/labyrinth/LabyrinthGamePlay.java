package labyrinth;

import java.util.ArrayList;
import java.util.Random;

public class LabyrinthGamePlay {
    
    private int size;
    private Labyrinth labyrinth;
    private int winner;
    private Position playerPos;
    private Position dragonPos;
    private Direction dragonDir;
    
    public LabyrinthGamePlay(int size) {
        this.size = size;
        labyrinth = LabyrinthGenerator.generate(size);
        winner = 0;
        playerPos = new Position(size - 1, 0);
        ArrayList<Position> candidates = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                Position p = new Position(i, j);
                if (!labyrinth.isWall(p) && p.distance(playerPos) > 3) {
                    candidates.add(p);
                }
            }
        }
        dragonPos = candidates.get(new Random().nextInt(candidates.size()));
        dragonDir = getRandomDragonDirection();
    }

    public Position getPlayerPos() {
        return playerPos;
    }
    public Position getDragonPos() {
        return dragonPos;
    }
    public boolean isOver() {
        return winner != 0;
    }
    public boolean playerWon() {
        return winner == 1;
    }
    public boolean playerLost() {
        return winner == -1;
    }
    public Labyrinth getLabyrinth() {
        return labyrinth;
    }
    
    /**
     * 
     * @param p
     * @return true if p is inside the labyrinth, false otherwise
     */
    private boolean isIn(Position p) {
        return 0 <= p.x && p.x < size && 0 <= p.y && p.y < size;
    }
    
    /**
     * Randomly chooses a direction for the dragon.
     * @return direction
     */
    private Direction getRandomDragonDirection() {
        int length = 0;
        Direction[] candidates = new Direction[4];
        for (Direction d : Direction.values()) {
            Position p = dragonPos.move(d);
            if (isIn(p) && !labyrinth.isWall(p)) {
                candidates[length++] = d;
            }
        }
        if (length == 0) return Direction.UP;
        return candidates[new Random().nextInt(length)];
    }
    
    /**
     *
     * @param p
     * @param d
     * @return the position after a move from p in the direction d if possible, p otherwise
     */
    private Position move(Position p, Direction d) {
        Position np = p.move(d);
        return isIn(np) && !labyrinth.isWall(np) && np != playerPos && np != dragonPos ? np : p;
    }
    
    /**
     * Moves the player in the direction d.
     * @param d
     * @return if the move was successful, false otherwise
     */
    public boolean movePlayer(Direction d) {
        if (isOver()) return false;
        Position newPos = move(playerPos, d);
        if (newPos.equals(playerPos)) return false;
        playerPos = newPos;
        if (playerPos.distance(dragonPos) <= 1) winner = -1;
        else if (playerPos.equals(new Position(0, size - 1))) winner = 1;
        return true;
    }
    
    /**
     * Moves the dragon.
     */
    public void moveDragon() {
        if (isOver()) return;
        Position newPos = move(dragonPos, dragonDir);
        if (newPos.equals(dragonPos)) {
            newPos = move(dragonPos, dragonDir = getRandomDragonDirection());
        }
        dragonPos = newPos;
        if (dragonPos.distance(playerPos) <= 1) winner = -1;
    }
    
}
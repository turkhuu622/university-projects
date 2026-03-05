package labyrinth;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Graphics2D;
import javax.swing.JPanel;

public class LabyrinthGamePlayGUI extends JPanel {
    
    private static final int VISIBILITY = 3;
    private static final int CELL_SIZE = 40;
    
    private int size;
    private LabyrinthGamePlay gamePlay;

    public LabyrinthGamePlayGUI(int size) {
        this.size = size;
        gamePlay = new LabyrinthGamePlay(size);
        Dimension dim = new Dimension(size * CELL_SIZE, size * CELL_SIZE);
        setSize(dim);
        setPreferredSize(dim);
        setMaximumSize(dim);
    }
    
    public LabyrinthGamePlay getGamePlay() {
        return gamePlay;
    }
    
    @Override
    protected void paintComponent(Graphics graphics) {
        Graphics2D g = (Graphics2D)graphics;
        g.setColor(Color.LIGHT_GRAY);
        g.fillRect(0, 0, size * CELL_SIZE, size * CELL_SIZE);
        
        Position p = gamePlay.getPlayerPos();
        Position d = gamePlay.getDragonPos();
        
        for (int x = p.x - VISIBILITY; x <= p.x + VISIBILITY; x++) {
            int xDif = Math.abs(x - p.x), yMaxDif = VISIBILITY - xDif;
            for (int y = p.y - yMaxDif; y <= p.y + yMaxDif; y++) {
                Position xy = new Position(x, y);
                if (!(0 <= x && x < size && 0 <= y && y < size)) continue;
                g.setColor(gamePlay.getLabyrinth().isWall(xy) ? Color.BLACK : Color.WHITE);
                g.fillRect(y * CELL_SIZE, x * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }
        
        g.setColor(Color.CYAN);
        g.fillOval(p.y * CELL_SIZE + CELL_SIZE / 10, p.x * CELL_SIZE + CELL_SIZE / 10, CELL_SIZE - CELL_SIZE / 5, CELL_SIZE - CELL_SIZE / 5);
        
        if (p.distance(d) <= VISIBILITY) {
            g.setColor(Color.RED);
            int[] xs = new int[3], ys = new int[3];
            xs[0] = d.y * CELL_SIZE + CELL_SIZE / 2;
            xs[1] = xs[0] + CELL_SIZE / 2 - CELL_SIZE / 10;
            xs[2] = xs[0] - CELL_SIZE / 2 + CELL_SIZE / 10;
            ys[0] = d.x * CELL_SIZE + CELL_SIZE / 10;
            ys[1] = ys[2] = (d.x + 1) * CELL_SIZE - CELL_SIZE / 10;
            g.fillPolygon(xs, ys, 3);
        }
    }
    
}
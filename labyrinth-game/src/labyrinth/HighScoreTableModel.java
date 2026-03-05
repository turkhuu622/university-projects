package labyrinth;

import java.util.ArrayList;
import javax.swing.table.AbstractTableModel;

public class HighScoreTableModel extends AbstractTableModel {
    
    private final ArrayList<HighScore> highScores;
    private final String[] colName = new String[]{"Player Name", "Score"};
    
    public HighScoreTableModel(ArrayList<HighScore> highScores) {
        this.highScores = highScores;
    }
    
    @Override public int getRowCount() {return highScores.size();}
    @Override public int getColumnCount() {return colName.length;}
    
    @Override public Object getValueAt(int r, int c) {
        HighScore h = highScores.get(r);
        return c == 0 ? h.playerName : h.score;
    }
    
    @Override public String getColumnName(int i) {return colName[i];}
    
}
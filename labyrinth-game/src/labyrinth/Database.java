package labyrinth;

import java.sql.Connection;
import java.sql.Statement;
import java.sql.ResultSet;
import java.util.ArrayList;

public class Database {
    
    private final String tableName = "highscore";
    private final ArrayList<HighScore> highScores;
    private final int maxScores = 10;
    
    public Database() {
        highScores = new ArrayList<>();
    }
    
    /**
     * Merges h into the database and stores it into the HighScore table if store is true.
     * @param h
     * @param store
     * @return true if there was an update to the database, false otherwise
     */
    private boolean mergeHighScores(HighScore h) {
        int i = highScores.indexOf(h);
        if (i == -1) {
            int j = 0;
            while (j < highScores.size() && highScores.get(j).score >= h.score) j++;
            if (j == maxScores) return false;
            highScores.add(j, h);
            while (highScores.size() > maxScores) highScores.remove(highScores.size() - 1);
            return true;
        }
        if (highScores.get(i).score >= h.score) return false;
        for (; i > 0 && highScores.get(i - 1).score < h.score; i--) {
            highScores.set(i, highScores.get(i - 1));
        }
        highScores.set(i, h);
        return true;
    }
    /**
     * Stores h into the database.
     * @param h
     * @return true if there was an update to the database, false otherwise
     */
    public boolean storeHighScore(HighScore h) {
        return mergeHighScores(h);
    }
    
    public ArrayList<HighScore> getHighScores() {
        return highScores;
    }
    
}
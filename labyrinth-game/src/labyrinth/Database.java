package labyrinth;

import java.sql.Connection;
import java.sql.Statement;
import java.sql.ResultSet;
import java.util.ArrayList;

public class Database {
    
    private final String tableName = "highscore";
    private final Connection conn;
    private final ArrayList<HighScore> highScores;
    private final int maxScores = 10;
    
    public Database() {
        Connection c = null;
        try {
            c = ConnectionFactory.getConnection();
        } catch (Exception e) {
            System.out.println("No connection.");
        }
        conn = c;
        highScores = new ArrayList<>();
        loadHighScores();
    }
    
    /**
     * Loads the high scores from the HighScore table.
     */
    private void loadHighScores() {
        try (Statement stmt = conn.createStatement()) {
            ResultSet rs = stmt.executeQuery("SELECT * FROM " + tableName);
            while (rs.next()) {
                String playerName = rs.getString("Player");
                int score = rs.getInt("Score");
                mergeHighScores(new HighScore(playerName, score), false);
            }
        } catch (Exception e) {
            System.out.println("loadHighScores error");
        }
    }
    
    /**
     * Merges h into the database and stores it into the HighScore table if store is true.
     * @param h
     * @param store
     * @return true if there was an update to the database, false otherwise
     */
    private boolean mergeHighScores(HighScore h, boolean store) {
        int i = highScores.indexOf(h);
        if (i == -1) {
            int j = 0;
            while (j < highScores.size() && highScores.get(j).score >= h.score) j++;
            if (j == maxScores) return false;
            highScores.add(j, h);
            while (highScores.size() > maxScores) highScores.remove(highScores.size() - 1);
            if (store) storeToDatabase(h);
            return true;
        }
        if (highScores.get(i).score >= h.score) return false;
        for (; i > 0 && highScores.get(i - 1).score < h.score; i--) {
            highScores.set(i, highScores.get(i - 1));
        }
        highScores.set(i, h);
        if (store) storeToDatabase(h);
        return true;
    }
    
    /**
     * Stores h into the HighScore table.
     * @param h
     * @return the number of affected rows of the HighScore table
     */
    private int storeToDatabase(HighScore h) {
        try (Statement stmt = conn.createStatement()) {
            String s = "";
            s += "INSERT INTO " + tableName + " (Player, Score) ";
            s += "VALUES('" + h.playerName + "', " + h.score + ") ";
            s += "ON DUPLICATE KEY UPDATE Score=" + h.score;
            return stmt.executeUpdate(s);
        } catch (Exception e) {
            System.out.println("storeToDatabase error");
        }
        return 0;
    }
    
    /**
     * Stores h into the database.
     * @param h
     * @return true if there was an update to the database, false otherwise
     */
    public boolean storeHighScore(HighScore h) {
        return mergeHighScores(h, true);
    }
    
    public ArrayList<HighScore> getHighScores() {
        return highScores;
    }
    
}
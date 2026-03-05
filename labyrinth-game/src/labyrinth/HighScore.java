package labyrinth;

import java.util.Objects;

public class HighScore {
    
    public final String playerName;
    public final int score;
    
    public HighScore(String name, int score) {
        this.playerName = name;
        this.score = score;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 89 * hash + Objects.hashCode(this.playerName);
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
        final HighScore other = (HighScore) obj;
        return Objects.equals(this.playerName, other.playerName);
    }
    
}
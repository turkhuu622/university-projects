package labyrinth;

import java.awt.Color;
import java.awt.Container;
import java.awt.GridBagLayout;
import java.awt.event.ActionEvent;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import javax.swing.BorderFactory;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.Timer;
import javax.swing.border.EmptyBorder;

public class LabyrinthGameGUI extends JFrame {
    
    private JFrame frame;
    private Container pane;
    private LabyrinthGamePlay gamePlay;
    private LabyrinthGamePlayGUI gamePlayGUI;
    private int score;
    private int[] sizes = new int[]{5, 7, 9, 11, 13, 15};
    private JLabel scoreLabel;
    private JLabel timerLabel;
    private long startTime;
    private final Database db;
    private String playerName;
    private Timer dragonTimer;
    private JPanel wrapperPanel;
    
    
    public LabyrinthGameGUI() {
        
        setTitle("Labyrinth");
        db = new Database();
        pane = getContentPane();
        gamePlayGUI = new LabyrinthGamePlayGUI(sizes[0]);
        gamePlayGUI.setBorder(BorderFactory.createLineBorder(Color.BLACK, 2));
        wrapperPanel = new JPanel(new GridBagLayout());
        wrapperPanel.setBorder(new EmptyBorder(20, 20, 20, 20));
        
        playerName = JOptionPane.showInputDialog("Enter your name:");
        if (playerName == null) playerName = "";
        score = 0;
        
        JMenuBar menuBar = new JMenuBar();
        JMenu menu = new JMenu("Menu");
        JMenuItem restartGame = new JMenuItem("Restart Game");
        JMenuItem highScores = new JMenuItem("High Scores");
        JLabel playerLabel = new JLabel("Player: " + playerName);
        scoreLabel = new JLabel("Score: 0");
        timerLabel = new JLabel("Elapsed time: 0s");
        
        startTime = System.nanoTime();
        Timer timer = new Timer(1000, (ActionEvent e) -> {
            timerLabel.setText("Elapsed time: " + (System.nanoTime() - startTime) / 1000000000 + "s");
        });
        
        restartGame.addActionListener((ActionEvent e) -> {restartGame();});
        highScores.addActionListener((ActionEvent e) -> {
            new HighScoreWindow(db.getHighScores(), LabyrinthGameGUI.this);
        });
        
        menu.add(restartGame);
        menu.add(highScores);
        
        playerLabel.setBorder(new EmptyBorder(0, 20, 0, 0));
        scoreLabel.setBorder(new EmptyBorder(0, 20, 0, 0));
        timerLabel.setBorder(new EmptyBorder(0, 20, 0, 0));
        
        menuBar.add(menu);
        menuBar.add(playerLabel);
        menuBar.add(scoreLabel);
        menuBar.add(timerLabel);
        
        gamePlay = gamePlayGUI.getGamePlay();
        
        timer.start();
        dragonTimer = new Timer(700, (ActionEvent ae) -> {
            gamePlay.moveDragon();
            repaint();
            if (gamePlay.isOver()) gameOver();
        });
        dragonTimer.start();
        
        addKeyListener(new KeyAdapter() {
            @Override
            public void keyPressed(KeyEvent ke) {
                super.keyPressed(ke);
                int kc = ke.getKeyCode();
                Direction d = null;
                if (kc == KeyEvent.VK_A || kc == KeyEvent.VK_LEFT) {
                    d = Direction.LEFT;
                } else if (kc == KeyEvent.VK_D || kc == KeyEvent.VK_RIGHT) {
                    d = Direction.RIGHT;
                } else if (kc == KeyEvent.VK_W || kc == KeyEvent.VK_UP) {
                    d = Direction.UP;
                } else if (kc == KeyEvent.VK_S || kc == KeyEvent.VK_DOWN) {
                    d = Direction.DOWN;
                } else {
                    return;
                }
                gamePlay.movePlayer(d);
                repaint();
                if (gamePlay.isOver()) gameOver();
            }
        });
        
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setJMenuBar(menuBar);
        wrapperPanel.add(gamePlayGUI);
        pane.add(wrapperPanel);

        pack();
        setLocationRelativeTo(null);
        setVisible(true);
        
    }
    
    /**
     * Restarts the game.
     */
    private void restartGame() {
        startTime = System.nanoTime();
        scoreLabel.setText("Score: " + (score = 0));
        newGame();
    }
    
    /**
     * Finishes the current game.
     */
    private void gameOver() {
        dragonTimer.stop();
        if (gamePlay.playerWon()) {
            playNextLabyrinth();
        } else {
            JOptionPane.showMessageDialog(this, "Game over. Your score: " + score);
            db.storeHighScore(new HighScore(playerName, score));
            restartGame();
        }
        dragonTimer.start();
    }
    
    /**
     * Starts the next labyrinth.
     */
    public void playNextLabyrinth() {
        scoreLabel.setText("Score: " + ++score);
        newGame();
    }
    
    /**
     * Starts a new game.
     */
    private void newGame() {
        wrapperPanel.remove(gamePlayGUI);
        wrapperPanel.add(gamePlayGUI = new LabyrinthGamePlayGUI(sizes[Math.min(score, sizes.length - 1)]));
        gamePlayGUI.setBorder(BorderFactory.createLineBorder(Color.BLACK, 2));
        gamePlay = gamePlayGUI.getGamePlay();
        pack();
        gamePlayGUI.repaint();
    }
    
}
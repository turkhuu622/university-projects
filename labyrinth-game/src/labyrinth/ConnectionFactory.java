package labyrinth;

import com.mysql.cj.jdbc.MysqlConnectionPoolDataSource;
import java.sql.Connection;
import java.sql.SQLException;

public class ConnectionFactory {
    
    private static MysqlConnectionPoolDataSource c;

    private ConnectionFactory() {}
    
    /**
     * Establishes a connection to MySQL server.
     * @return
     * @throws ClassNotFoundException
     * @throws SQLException 
     */
    public static Connection getConnection() throws ClassNotFoundException, SQLException {
        if (c == null) {
            Class.forName("com.mysql.cj.jdbc.Driver");
            c = new MysqlConnectionPoolDataSource();
            c.setServerName("localhost");
            c.setPort(3306);
            c.setDatabaseName("labyrinth");
            c.setUser("root");
            c.setPassword("");
        }
        return c.getPooledConnection().getConnection();
    }
    
}
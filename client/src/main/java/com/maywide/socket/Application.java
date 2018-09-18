package com.maywide.socket;

import java.net.URISyntaxException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;

import io.socket.client.Ack;
import io.socket.client.IO;
import io.socket.client.IO.Options;
import io.socket.client.Socket;

@SpringBootApplication
public class Application {

    private static final Logger logger = LoggerFactory.getLogger(Application.class);

    public static void main(String[] args) {
        Environment env = SpringApplication.run(Application.class, args).getEnvironment();
        String SOCKET_SERVER_URI = env.getProperty("socket.server.uri");

        logger.info("Application start.\r\nsocket.server.uri = {}", SOCKET_SERVER_URI);

        String query = env.getProperty("query");
        if (query == null) {
            query = "cid=8270104243895428&sign=socket-sign";
        }

        final String cid = env.getProperty("cid", "123456789");

        try {
            Options opts = new IO.Options();
            opts.reconnection = true;
            opts.query = query;
            // opts.reconnectionDelay = 1000;
            // opts.reconnectionDelayMax = 5000;
            // opts.timeout = 10000;

            final Socket socket = IO.socket(SOCKET_SERVER_URI, opts);

            socket.on(Socket.EVENT_CONNECT, params -> {
                logger.info("======= SOCKET ON: {}, ARGS: {}", Socket.EVENT_CONNECT, params);

                socket.on("test", _params -> {
                    logger.info("======= SOCKET ON: {}, ARGS: {}", "test", _params);
                });

                socket.on("test-ack", _params -> {
                    logger.info("======= SOCKET ON: {}, ARGS: {}", "test-ack", _params);
                    Ack ack = (Ack) _params[_params.length - 1];
                    String data = cid;
                    ack.call(data);
                    logger.info("======= SOCKET ON: {}, ACK: {}", "test-ack", data);
                });

            });

            socket.on(Socket.EVENT_CONNECTING, params -> {
                logger.info("======= SOCKET ON: {}, ARGS: {}", Socket.EVENT_CONNECTING, params);
            });

            socket.on(Socket.EVENT_CONNECT_ERROR, params -> {
                logger.info("======= SOCKET ON: {}, ARGS: {}", Socket.EVENT_CONNECT_ERROR, params);
            });

            socket.on(Socket.EVENT_CONNECT_TIMEOUT, params -> {
                logger.info("======= SOCKET ON: {}, ARGS: {}", Socket.EVENT_CONNECT_TIMEOUT, params);
            });

            socket.on(Socket.EVENT_DISCONNECT, params -> {
                logger.info("======= SOCKET ON: {}, ARGS: {}", Socket.EVENT_DISCONNECT, params);
            });

            socket.on(Socket.EVENT_ERROR, params -> {
                logger.info("======= SOCKET ON: {}, ARGS: {}", Socket.EVENT_ERROR, params);
            });

            socket.on(Socket.EVENT_MESSAGE, params -> {
                logger.info("======= SOCKET ON: {}, ARGS: {}", Socket.EVENT_MESSAGE, params);
            });

            socket.on(Socket.EVENT_PING, params -> {

                logger.info("======= SOCKET ON: {}, ARGS: {}", Socket.EVENT_PING, params);
            });

            socket.on(Socket.EVENT_PONG, params -> {
                logger.info("======= SOCKET ON: {}, ARGS: {}", Socket.EVENT_PONG, params);
            });

            socket.on(Socket.EVENT_RECONNECT, params -> {
                logger.info("======= SOCKET ON: {}, ARGS: {}", Socket.EVENT_RECONNECT, params);
            });

            socket.on(Socket.EVENT_RECONNECT_ATTEMPT, params -> {
                logger.info("======= SOCKET ON: {}, ARGS: {}", Socket.EVENT_RECONNECT_ATTEMPT, params);
            });

            socket.on(Socket.EVENT_RECONNECT_ERROR, params -> {
                logger.info("======= SOCKET ON: {}, ARGS: {}", Socket.EVENT_RECONNECT_ERROR, params);
            });

            socket.on(Socket.EVENT_RECONNECT_FAILED, params -> {
                logger.info("======= SOCKET ON: {}, ARGS: {}", Socket.EVENT_RECONNECT_FAILED, params);
            });

            socket.on(Socket.EVENT_RECONNECTING, params -> {
                logger.info("======= SOCKET ON: {}, ARGS: {}", Socket.EVENT_RECONNECTING, params);
            });

            socket.connect();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
    }

}

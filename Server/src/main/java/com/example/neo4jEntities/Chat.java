package com.example.neo4jEntities;

import lombok.Data;
import org.springframework.data.neo4j.core.schema.Node;
import java.util.ArrayList;

@Data
@Node("Conversation")
public class Chat {

    private ArrayList<Message> messages = new ArrayList<>();
    private Meeting meeting;

    public Chat(ArrayList<Message> messages, Meeting meeting) {
        this.messages = messages;
        this.meeting = meeting;
    }
}

package com.example.neo4jEntities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.Node;

import java.util.ArrayList;

@Node("Conversation")
public class Chat {

    @Getter @Setter
    private ArrayList<Message> messages = new ArrayList<>();
    @Getter @Setter
    private Meeting meeting;

    public Chat(ArrayList<Message> messages, Meeting meeting) {
        this.messages = messages;
        this.meeting = meeting;
    }
}

package com.example.neo4jEntities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.Node;

import java.util.ArrayList;
import java.util.List;

@Node("Conversation")
public class Conversation {

    @Getter @Setter
    private ArrayList<Message> messages = new ArrayList<>();
    @Getter @Setter
    private Reunion reunion;

    public Conversation(ArrayList<Message> messages, Reunion reunion) {
        this.messages = messages;
        this.reunion = reunion;
    }
}

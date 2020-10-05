package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Transactions.
 */
@Entity
@Table(name = "transactions")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "transactions")
public class Transactions implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "value")
    private Integer value;

    @ManyToMany(mappedBy = "transactions")
    @JsonIgnore
    private Set<Client> clients = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getValue() {
        return value;
    }

    public Transactions value(Integer value) {
        this.value = value;
        return this;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public Set<Client> getClients() {
        return clients;
    }

    public Transactions clients(Set<Client> clients) {
        this.clients = clients;
        return this;
    }

    public Transactions addClient(Client client) {
        this.clients.add(client);
        client.getTransactions().add(this);
        return this;
    }

    public Transactions removeClient(Client client) {
        this.clients.remove(client);
        client.getTransactions().remove(this);
        return this;
    }

    public void setClients(Set<Client> clients) {
        this.clients = clients;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Transactions)) {
            return false;
        }
        return id != null && id.equals(((Transactions) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Transactions{" +
            "id=" + getId() +
            ", value=" + getValue() +
            "}";
    }
}

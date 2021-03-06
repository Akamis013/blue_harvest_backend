package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Acount.
 */
@Entity
@Table(name = "acount")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "acount")
public class Acount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "acount_id")
    private Integer acountID;

    @Column(name = "credit")
    private Integer credit;

    @OneToMany(mappedBy = "acount")
    private Set<Client> clients = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "acounts", allowSetters = true)
    private Client client;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAcountID() {
        return acountID;
    }

    public Acount acountID(Integer acountID) {
        this.acountID = acountID;
        return this;
    }

    public void setAcountID(Integer acountID) {
        this.acountID = acountID;
    }

    public Integer getCredit() {
        return credit;
    }

    public Acount credit(Integer credit) {
        this.credit = credit;
        return this;
    }

    public void setCredit(Integer credit) {
        this.credit = credit;
    }

    public Set<Client> getClients() {
        return clients;
    }

    public Acount clients(Set<Client> clients) {
        this.clients = clients;
        return this;
    }

    public Acount addClient(Client client) {
        this.clients.add(client);
        client.setAcount(this);
        return this;
    }

    public Acount removeClient(Client client) {
        this.clients.remove(client);
        client.setAcount(null);
        return this;
    }

    public void setClients(Set<Client> clients) {
        this.clients = clients;
    }

    public Client getClient() {
        return client;
    }

    public Acount client(Client client) {
        this.client = client;
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Acount)) {
            return false;
        }
        return id != null && id.equals(((Acount) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Acount{" +
            "id=" + getId() +
            ", acountID=" + getAcountID() +
            ", credit=" + getCredit() +
            "}";
    }
}

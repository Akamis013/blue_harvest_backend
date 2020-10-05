package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Client.
 */
@Entity
@Table(name = "client")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "client")
public class Client implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "customer_id")
    private Integer customerID;

    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private String surname;

    @Column(name = "balance")
    private Integer balance;

    @Column(name = "initialcredit")
    private Integer initialcredit;

    @OneToMany(mappedBy = "client")
    private Set<Acount> acounts = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "client_transactions",
               joinColumns = @JoinColumn(name = "client_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "transactions_id", referencedColumnName = "id"))
    private Set<Transactions> transactions = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "clients", allowSetters = true)
    private Acount acount;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCustomerID() {
        return customerID;
    }

    public Client customerID(Integer customerID) {
        this.customerID = customerID;
        return this;
    }

    public void setCustomerID(Integer customerID) {
        this.customerID = customerID;
    }

    public String getName() {
        return name;
    }

    public Client name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public Client surname(String surname) {
        this.surname = surname;
        return this;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public Integer getBalance() {
        return balance;
    }

    public Client balance(Integer balance) {
        this.balance = balance;
        return this;
    }

    public void setBalance(Integer balance) {
        this.balance = balance;
    }

    public Integer getInitialcredit() {
        return initialcredit;
    }

    public Client initialcredit(Integer initialcredit) {
        this.initialcredit = initialcredit;
        return this;
    }

    public void setInitialcredit(Integer initialcredit) {
        this.initialcredit = initialcredit;
    }

    public Set<Acount> getAcounts() {
        return acounts;
    }

    public Client acounts(Set<Acount> acounts) {
        this.acounts = acounts;
        return this;
    }

    public Client addAcount(Acount acount) {
        this.acounts.add(acount);
        acount.setClient(this);
        return this;
    }

    public Client removeAcount(Acount acount) {
        this.acounts.remove(acount);
        acount.setClient(null);
        return this;
    }

    public void setAcounts(Set<Acount> acounts) {
        this.acounts = acounts;
    }

    public Set<Transactions> getTransactions() {
        return transactions;
    }

    public Client transactions(Set<Transactions> transactions) {
        this.transactions = transactions;
        return this;
    }

    public Client addTransactions(Transactions transactions) {
        this.transactions.add(transactions);
        transactions.getClients().add(this);
        return this;
    }

    public Client removeTransactions(Transactions transactions) {
        this.transactions.remove(transactions);
        transactions.getClients().remove(this);
        return this;
    }

    public void setTransactions(Set<Transactions> transactions) {
        this.transactions = transactions;
    }

    public Acount getAcount() {
        return acount;
    }

    public Client acount(Acount acount) {
        this.acount = acount;
        return this;
    }

    public void setAcount(Acount acount) {
        this.acount = acount;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Client)) {
            return false;
        }
        return id != null && id.equals(((Client) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Client{" +
            "id=" + getId() +
            ", customerID=" + getCustomerID() +
            ", name='" + getName() + "'" +
            ", surname='" + getSurname() + "'" +
            ", balance=" + getBalance() +
            ", initialcredit=" + getInitialcredit() +
            "}";
    }
}

package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.Transactions;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Transactions} entity.
 */
public interface TransactionsSearchRepository extends ElasticsearchRepository<Transactions, Long> {
}

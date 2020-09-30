package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.Acount;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Acount} entity.
 */
public interface AcountSearchRepository extends ElasticsearchRepository<Acount, Long> {
}

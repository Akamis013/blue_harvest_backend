package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Acount;
import com.mycompany.myapp.repository.AcountRepository;
import com.mycompany.myapp.repository.search.AcountSearchRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Acount}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AcountResource {

    private final Logger log = LoggerFactory.getLogger(AcountResource.class);

    private static final String ENTITY_NAME = "acount";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AcountRepository acountRepository;

    private final AcountSearchRepository acountSearchRepository;

    public AcountResource(AcountRepository acountRepository, AcountSearchRepository acountSearchRepository) {
        this.acountRepository = acountRepository;
        this.acountSearchRepository = acountSearchRepository;
    }

    /**
     * {@code POST  /acounts} : Create a new acount.
     *
     * @param acount the acount to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new acount, or with status {@code 400 (Bad Request)} if the acount has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/acounts")
    public ResponseEntity<Acount> createAcount(@RequestBody Acount acount) throws URISyntaxException {
        log.debug("REST request to save Acount : {}", acount);
        if (acount.getId() != null) {
            throw new BadRequestAlertException("A new acount cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Acount result = acountRepository.save(acount);
        acountSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/acounts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /acounts} : Updates an existing acount.
     *
     * @param acount the acount to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated acount,
     * or with status {@code 400 (Bad Request)} if the acount is not valid,
     * or with status {@code 500 (Internal Server Error)} if the acount couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/acounts")
    public ResponseEntity<Acount> updateAcount(@RequestBody Acount acount) throws URISyntaxException {
        log.debug("REST request to update Acount : {}", acount);
        if (acount.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Acount result = acountRepository.save(acount);
        acountSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, acount.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /acounts} : get all the acounts.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of acounts in body.
     */
    @GetMapping("/acounts")
    public List<Acount> getAllAcounts() {
        log.debug("REST request to get all Acounts");
        return acountRepository.findAll();
    }

    /**
     * {@code GET  /acounts/:id} : get the "id" acount.
     *
     * @param id the id of the acount to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the acount, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/acounts/{id}")
    public ResponseEntity<Acount> getAcount(@PathVariable Long id) {
        log.debug("REST request to get Acount : {}", id);
        Optional<Acount> acount = acountRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(acount);
    }

    /**
     * {@code DELETE  /acounts/:id} : delete the "id" acount.
     *
     * @param id the id of the acount to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/acounts/{id}")
    public ResponseEntity<Void> deleteAcount(@PathVariable Long id) {
        log.debug("REST request to delete Acount : {}", id);
        acountRepository.deleteById(id);
        acountSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/acounts?query=:query} : search for the acount corresponding
     * to the query.
     *
     * @param query the query of the acount search.
     * @return the result of the search.
     */
    @GetMapping("/_search/acounts")
    public List<Acount> searchAcounts(@RequestParam String query) {
        log.debug("REST request to search Acounts for query {}", query);
        return StreamSupport
            .stream(acountSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}

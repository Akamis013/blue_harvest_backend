package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.BlueHarvestBackendApp;
import com.mycompany.myapp.domain.Acount;
import com.mycompany.myapp.repository.AcountRepository;
import com.mycompany.myapp.repository.search.AcountSearchRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link AcountResource} REST controller.
 */
@SpringBootTest(classes = BlueHarvestBackendApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class AcountResourceIT {

    private static final Integer DEFAULT_ACOUNT_ID = 1;
    private static final Integer UPDATED_ACOUNT_ID = 2;

    private static final Integer DEFAULT_CREDIT = 1;
    private static final Integer UPDATED_CREDIT = 2;

    @Autowired
    private AcountRepository acountRepository;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.AcountSearchRepositoryMockConfiguration
     */
    @Autowired
    private AcountSearchRepository mockAcountSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAcountMockMvc;

    private Acount acount;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Acount createEntity(EntityManager em) {
        Acount acount = new Acount()
            .acountID(DEFAULT_ACOUNT_ID)
            .credit(DEFAULT_CREDIT);
        return acount;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Acount createUpdatedEntity(EntityManager em) {
        Acount acount = new Acount()
            .acountID(UPDATED_ACOUNT_ID)
            .credit(UPDATED_CREDIT);
        return acount;
    }

    @BeforeEach
    public void initTest() {
        acount = createEntity(em);
    }

    @Test
    @Transactional
    public void createAcount() throws Exception {
        int databaseSizeBeforeCreate = acountRepository.findAll().size();
        // Create the Acount
        restAcountMockMvc.perform(post("/api/acounts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(acount)))
            .andExpect(status().isCreated());

        // Validate the Acount in the database
        List<Acount> acountList = acountRepository.findAll();
        assertThat(acountList).hasSize(databaseSizeBeforeCreate + 1);
        Acount testAcount = acountList.get(acountList.size() - 1);
        assertThat(testAcount.getAcountID()).isEqualTo(DEFAULT_ACOUNT_ID);
        assertThat(testAcount.getCredit()).isEqualTo(DEFAULT_CREDIT);

        // Validate the Acount in Elasticsearch
        verify(mockAcountSearchRepository, times(1)).save(testAcount);
    }

    @Test
    @Transactional
    public void createAcountWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = acountRepository.findAll().size();

        // Create the Acount with an existing ID
        acount.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAcountMockMvc.perform(post("/api/acounts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(acount)))
            .andExpect(status().isBadRequest());

        // Validate the Acount in the database
        List<Acount> acountList = acountRepository.findAll();
        assertThat(acountList).hasSize(databaseSizeBeforeCreate);

        // Validate the Acount in Elasticsearch
        verify(mockAcountSearchRepository, times(0)).save(acount);
    }


    @Test
    @Transactional
    public void getAllAcounts() throws Exception {
        // Initialize the database
        acountRepository.saveAndFlush(acount);

        // Get all the acountList
        restAcountMockMvc.perform(get("/api/acounts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(acount.getId().intValue())))
            .andExpect(jsonPath("$.[*].acountID").value(hasItem(DEFAULT_ACOUNT_ID)))
            .andExpect(jsonPath("$.[*].credit").value(hasItem(DEFAULT_CREDIT)));
    }
    
    @Test
    @Transactional
    public void getAcount() throws Exception {
        // Initialize the database
        acountRepository.saveAndFlush(acount);

        // Get the acount
        restAcountMockMvc.perform(get("/api/acounts/{id}", acount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(acount.getId().intValue()))
            .andExpect(jsonPath("$.acountID").value(DEFAULT_ACOUNT_ID))
            .andExpect(jsonPath("$.credit").value(DEFAULT_CREDIT));
    }
    @Test
    @Transactional
    public void getNonExistingAcount() throws Exception {
        // Get the acount
        restAcountMockMvc.perform(get("/api/acounts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAcount() throws Exception {
        // Initialize the database
        acountRepository.saveAndFlush(acount);

        int databaseSizeBeforeUpdate = acountRepository.findAll().size();

        // Update the acount
        Acount updatedAcount = acountRepository.findById(acount.getId()).get();
        // Disconnect from session so that the updates on updatedAcount are not directly saved in db
        em.detach(updatedAcount);
        updatedAcount
            .acountID(UPDATED_ACOUNT_ID)
            .credit(UPDATED_CREDIT);

        restAcountMockMvc.perform(put("/api/acounts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAcount)))
            .andExpect(status().isOk());

        // Validate the Acount in the database
        List<Acount> acountList = acountRepository.findAll();
        assertThat(acountList).hasSize(databaseSizeBeforeUpdate);
        Acount testAcount = acountList.get(acountList.size() - 1);
        assertThat(testAcount.getAcountID()).isEqualTo(UPDATED_ACOUNT_ID);
        assertThat(testAcount.getCredit()).isEqualTo(UPDATED_CREDIT);

        // Validate the Acount in Elasticsearch
        verify(mockAcountSearchRepository, times(1)).save(testAcount);
    }

    @Test
    @Transactional
    public void updateNonExistingAcount() throws Exception {
        int databaseSizeBeforeUpdate = acountRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAcountMockMvc.perform(put("/api/acounts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(acount)))
            .andExpect(status().isBadRequest());

        // Validate the Acount in the database
        List<Acount> acountList = acountRepository.findAll();
        assertThat(acountList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Acount in Elasticsearch
        verify(mockAcountSearchRepository, times(0)).save(acount);
    }

    @Test
    @Transactional
    public void deleteAcount() throws Exception {
        // Initialize the database
        acountRepository.saveAndFlush(acount);

        int databaseSizeBeforeDelete = acountRepository.findAll().size();

        // Delete the acount
        restAcountMockMvc.perform(delete("/api/acounts/{id}", acount.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Acount> acountList = acountRepository.findAll();
        assertThat(acountList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Acount in Elasticsearch
        verify(mockAcountSearchRepository, times(1)).deleteById(acount.getId());
    }

    @Test
    @Transactional
    public void searchAcount() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        acountRepository.saveAndFlush(acount);
        when(mockAcountSearchRepository.search(queryStringQuery("id:" + acount.getId())))
            .thenReturn(Collections.singletonList(acount));

        // Search the acount
        restAcountMockMvc.perform(get("/api/_search/acounts?query=id:" + acount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(acount.getId().intValue())))
            .andExpect(jsonPath("$.[*].acountID").value(hasItem(DEFAULT_ACOUNT_ID)))
            .andExpect(jsonPath("$.[*].credit").value(hasItem(DEFAULT_CREDIT)));
    }
}

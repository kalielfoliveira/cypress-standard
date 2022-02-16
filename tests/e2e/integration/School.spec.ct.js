/// <reference types="cypress" />


describe('modules/school/components/SchoolList.vue', () => {
  beforeEach(() => {
    cy.viewport(1366, 768);

    Cypress.Cookies.defaults({
      preserve: 'i_educar_session',
    })
  });

  it('deve fazer login no i-educar', () => {
    cy.visit('/');

    cy.get('input[name="login"]').click().type('admin');
    cy.get('input[name="password"]')
      .click()
      .type('%89bfaac6d4e39d00843757d178f7eeDC');
    cy.get('button[id="form-login-submit"]').click();

    cy.url().should('include', '/intranet/index.php');
    cy.get('div[id="ieducar-quick-search"]').should(($div) => {
      expect($div.html()).to.contain('Busca rápida');
    });
  });

  it('deve acessar com sucesso a tela de edição de escolas', () => {
    cy.visit('/web/escola/editar/42070007');

    cy.get('.breadcrumb').should(($div) => {
      expect($div.html()).to.contain('Editar Escola');
    });

    cy.get('form').should('exist');

    // 24 campos da guia dados gerais
    // 15 campos da guia recursos

    cy.get('.div-striped').find('.x-field').should('have.length', 24);
    cy.get('label').find('span.text-red').should('have.length', 8);

    cy.get('.tabs').find('li').should('have.length', 2);

    const tabs = cy.get('.tab_item');

    tabs.eq(1).click();

    cy.get('.div-striped').find('.x-field').should('have.length', 15);
    cy.get('label').find('span.text-red').should('have.length', 0);
  });

  it('deve mostrar mensagens de erro, se os campos obrigatórios não forem preenchidos ao tentar salvar', () => {
    cy.visit('/web/escola/editar/42070007');

    // cy.get('input[name="escola_inep_id"]').click().type(' ');
    // cy.get('input[name="fantasia"]').click().type(' ');
    // cy.get('input[name="sigla"]').click().type(' ');
    // cy.get('input[name="ref_cod_instituicao"]').click().type(' ');
    // cy.get('input[name="ref_cod_escola_rede_ensino"]').click().type(' ');
    // cy.get('input[name="zona_localizacao"]').click().type(' ');
    // cy.get('input[name="localizacao_diferenciada"]').click().type(' ');
    // cy.get('input[name="district_district"]').click().type(' ');

    cy.get('button[type="submit"]').click();

    cy.get('div[name="escola_inep_id"]').should(($div) => {
      expect($div.html()).to.contain('O campo é obrigatório');
    });

    cy.get('div[name="fantasia"]').should(($div) => {
      expect($div.html()).to.contain('O campo é obrigatório');
    });

    cy.get('div[name="sigla"]').should(($div) => {
      expect($div.html()).to.contain('O campo é obrigatório');
    });

    cy.get('div[name="ref_cod_instituicao"]').should(($div) => {
      expect($div.html()).to.contain('O campo é obrigatório');
    });

    cy.get('div[name="ref_cod_escola_rede_ensino"]').should(($div) => {
      expect($div.html()).to.contain('O campo é obrigatório');
    });

    cy.get('div[name="zona_localizacao"]').should(($div) => {
      expect($div.html()).to.contain('O campo é obrigatório');
    });

    cy.get('div[name="localizacao_diferenciada"]').should(($div) => {
      expect($div.html()).to.contain('O campo é obrigatório');
    });

    cy.get('div[name="district_district"]').should(($div) => {
      expect($div.html()).to.contain('O campo é obrigatório');
    });
  });
});

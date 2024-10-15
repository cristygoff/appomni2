const today = new Date();
const todayString = today.toString().slice(4,10) + ', ' + today.toString().slice(11,15);
const todayStringWithSlashes = today.getMonth()+1 + "/" + today.getDate() + "/" + today.getFullYear();

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() -1);
const yesterdayString = yesterday.toString().slice(4,10) + ', ' + yesterday.toString().slice(11,15);
const yesterdayStringWithSlashes = yesterday.getMonth()+1 + "/" + yesterday.getDate() + "/" + yesterday.getFullYear();

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowString = tomorrow.toString().slice(4,10) + ', ' + tomorrow.toString().slice(11,15);
const tomorrowStringWithSlashes = tomorrow.getMonth()+1 + "/" + tomorrow.getDate() + "/" + tomorrow.getFullYear();

describe('DateRangePicker', () => {
  beforeEach(()=>{
    cy.visit('/');
    cy.get('.DateRangeSelect').should('be.visible');
  });

  it('should render with the calendar controls hidden', () => {
    cy.get('.DateRangeSelect').children().first().should('be.visible').and('contain.text', 'Start Date');
    cy.get('.DateRangeSelect').children().last().should('be.visible').and('contain.text', 'End Date');
    cy.get('[role="tooltip"]').should('not.exist');
  });

  it('should render with calendar controls hidden after refresh', ()=>{
    cy.get('[role="tooltip"]').should('not.exist');
    cy.get('.DateRangeSelect').children().first().click();
    cy.get('[role="tooltip"]').should('be.visible');
    cy.reload();
    cy.get('[role="tooltip"]').should('not.exist');
  });

  it('calendar should highlight today', ()=>{
    cy.get('[role="tooltip"]').should('not.exist');
    cy.get('.DateRangeSelect').children().first().click();
    cy.get('[role="tooltip"]').should('be.visible');
    cy.get('[aria-label="' + todayString +'"]').should('have.css','border');
  });

  it('inputs should "shrink" when clicked', ()=>{
    cy.get('[class^="MuiInputLabel-root"]').first().should('have.attr', 'data-shrink', 'false');
    cy.get('.DateRangeSelect').children().first().click();
    cy.get('[class^="MuiInputLabel-root"]').first().should('have.attr', 'data-shrink', 'true');

    cy.reload();
    cy.get('[class^="MuiInputLabel-root"]').last().should('have.attr', 'data-shrink', 'false');
    cy.get('.DateRangeSelect').children().last().click();
    cy.get('[class^="MuiInputLabel-root"]').last().should('have.attr', 'data-shrink', 'true');
  });

  it('should set start and end dates appropriately', ()=>{
    // select today as start and end date
    cy.get('.DateRangeSelect').children().first().click();
    cy.get('[aria-label="' + todayString + '"]').click();
    cy.get('[aria-label="' + todayString + '"]').click();
    cy.get('input').first().should('have.value', todayStringWithSlashes);
    cy.get('input').last().should('have.value', todayStringWithSlashes);
    
    // select yesterday and tomorrow
    cy.reload();
    cy.get('.DateRangeSelect').children().first().click();
    cy.get('[aria-label="' + yesterdayString + '"]').click();
    cy.get('[aria-label="' + tomorrowString + '"]').click();
    cy.get('input').first().should('have.value', yesterdayStringWithSlashes);
    cy.get('input').last().should('have.value', tomorrowStringWithSlashes);

    // select tomorrow and yesterday
    cy.reload();
    cy.get('.DateRangeSelect').children().first().click();
    cy.get('[aria-label="' + tomorrowString + '"]').click();
    cy.get('[aria-label="' + yesterdayString + '"]').click();
    cy.get('input').first().should('have.value', yesterdayStringWithSlashes);
    cy.get('input').last().should('have.value', '');
  });  
});

class RecipeCard extends HTMLElement {
	// Called once when document.createElement('recipe-card') is called, or
	// the element is written into the DOM directly as <recipe-card>
	constructor() {
	  super(); // Inherit everything from HTMLElement
  
	  // EXPOSE - START (All expose numbers start with A)
	  // A1. Attach the shadow DOM to this Web Component (leave the mode open)
	  this.attachShadow({ mode: 'open' });
  
	  // A2. Create an <article> element - This will hold our markup once our data is set
	  const article = document.createElement('article');
  
	  // A3. Create a style element - This will hold all of the styles for the Web Component
	  const style = document.createElement('style');
  
	  // A4. Insert all of the styles from cardTemplate.html into the <style> element you just made (copy everything INSIDE the <style> tag>)
	  // We'll do this asynchronously but handle it properly
	  fetch('reference/cardTemplate.html')
		.then(response => response.text())
		.then(html => {
		  const tempDiv = document.createElement('div');
		  tempDiv.innerHTML = html;
		  const fetchedStyle = tempDiv.querySelector('style');
		  if (fetchedStyle) {
			style.textContent = fetchedStyle.textContent;
			// A5. Append the <style> and <article> elements to the Shadow DOM
			this.shadowRoot.append(style, article);
		  }
		})
		.catch(error => {
		  console.error('Failed to load styles from cardTemplate.html:', error);
		});
  
	  // A5. Append the <article> element to the Shadow DOM immediately
	  // (The style element will be appended once fetched)
	  this.shadowRoot.append(article);
	}
  
	/**
	 * Called when the .data property is set on this element.
	 *
	 * For example:
	 * let recipeCard = document.createElement('recipe-card'); // Calls constructor()
	 * recipeCard.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
	 *
	 * @param {Object} data - The data to pass into the <recipe-card> must be of the
	 *                        following format:
	 *                        {
	 *                          "imgSrc": "string",
	 *                          "imgAlt": "string",
	 *                          "titleLnk": "string",
	 *                          "titleTxt": "string",
	 *                          "organization": "string",
	 *                          "rating": number,
	 *                          "numRatings": number,
	 *                          "lengthTime": "string",
	 *                          "ingredients": "string"
	 *                        }
	 */
	set data(data) {
	  // If nothing was passed in, return
	  if (!data) return;
  
	  // A6. Select the <article> we added to the Shadow DOM in the constructor
	  const article = this.shadowRoot.querySelector('article');
  
	  // A7. Set the contents of the <article> with the <article> template given in
	  // cardTemplate.html and the data passed in (You should only have one <article>,
	  // do not nest an <article> inside another <article>). You should use template
	  // literals (template strings) and element.innerHTML for this.
	  // Do NOT include the <article> tags within the innerHTML of the element you create.
	  // Remember to replace all the placeholders in the template with the data passed in.
	  article.innerHTML = `
		<img src="${data.imgSrc}" alt="${data.imgAlt}">
		<p class="title"><a href="${data.titleLnk}">${data.titleTxt}</a></p>
		<p class="organization">${data.organization}</p>
		<div class="rating">
		  <span>${data.rating}</span>
		  <img src="assets/images/icons/${data.rating}-star.svg" alt="${data.rating} stars">
		  <span>(${data.numRatings})</span>
		</div>
		<time>${data.lengthTime}</time>
		<p class="ingredients">${data.ingredients}</p>
	  `;
	}
  }
  
  // A8. Define the Class as a customElement so that you can create 'recipe-card' elements
  customElements.define('recipe-card', RecipeCard);
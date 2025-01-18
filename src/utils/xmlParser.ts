export function xmlToJson(xml: string) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, "text/xml");
  
  function elementToJson(element: Element): any {
    const obj: any = {};
    
    // Handle attributes
    for (const attr of Array.from(element.attributes)) {
      obj[attr.name] = attr.value;
    }
    
    // Handle child elements
    const children = Array.from(element.children);
    if (children.length > 0) {
      children.forEach(child => {
        const childJson = elementToJson(child);
        const tagName = child.tagName.toLowerCase();
        
        if (obj[tagName]) {
          if (!Array.isArray(obj[tagName])) {
            obj[tagName] = [obj[tagName]];
          }
          obj[tagName].push(childJson);
        } else {
          obj[tagName] = childJson;
        }
      });
    } else {
      // Handle text content if no children
      const text = element.textContent?.trim();
      if (text) {
        return text;
      }
    }
    
    return obj;
  }
  
  const rootElement = xmlDoc.documentElement;
  const result = {
    [rootElement.tagName.toLowerCase()]: elementToJson(rootElement)
  };
  
  return result;
}

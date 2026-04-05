import {
  projectsData,
  gptsData,
  certificationsData,
  technologies,
  partners,
} from '../data';

describe('projectsData', () => {
  it('should have valid structure', () => {
    expect(Array.isArray(projectsData)).toBe(true);
    expect(projectsData.length).toBeGreaterThan(0);
  });

  it('should have required fields for each project', () => {
    projectsData.forEach((project) => {
      expect(project).toHaveProperty('id');
      expect(project).toHaveProperty('title');
      expect(project).toHaveProperty('embedId');
      expect(project.title).toHaveProperty('pt');
      expect(project.title).toHaveProperty('en');
      expect(typeof project.id).toBe('string');
      expect(typeof project.embedId).toBe('string');
    });
  });

  it('should have unique project IDs', () => {
    const ids = projectsData.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});

describe('gptsData', () => {
  it('should have valid structure', () => {
    expect(Array.isArray(gptsData)).toBe(true);
    expect(gptsData.length).toBeGreaterThan(0);
  });

  it('should have required fields for each GPT', () => {
    gptsData.forEach((gpt) => {
      expect(gpt).toHaveProperty('id');
      expect(gpt).toHaveProperty('title');
      expect(gpt).toHaveProperty('description');
      expect(gpt).toHaveProperty('link');
      expect(gpt).toHaveProperty('icon');
      expect(gpt.title).toHaveProperty('pt');
      expect(gpt.title).toHaveProperty('en');
      expect(gpt.description).toHaveProperty('pt');
      expect(gpt.description).toHaveProperty('en');
    });
  });

  it('should have unique GPT IDs', () => {
    const ids = gptsData.map((g) => g.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have valid links', () => {
    gptsData.forEach((gpt) => {
      expect(typeof gpt.link).toBe('string');
      expect(gpt.link.length).toBeGreaterThan(0);
    });
  });
});

describe('certificationsData', () => {
  it('should have valid structure', () => {
    expect(Array.isArray(certificationsData)).toBe(true);
    expect(certificationsData.length).toBeGreaterThan(0);
  });

  it('should have required fields for each certification', () => {
    certificationsData.forEach((cert) => {
      expect(cert).toHaveProperty('id');
      expect(cert).toHaveProperty('title');
      expect(cert).toHaveProperty('issuer');
      expect(cert).toHaveProperty('year');
      expect(cert).toHaveProperty('link');
      expect(cert).toHaveProperty('icon');
      expect(cert.title).toHaveProperty('pt');
      expect(cert.title).toHaveProperty('en');
    });
  });

  it('should have unique certification IDs', () => {
    const ids = certificationsData.map((c) => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});

describe('technologies', () => {
  it('should have valid structure', () => {
    expect(Array.isArray(technologies)).toBe(true);
    expect(technologies.length).toBeGreaterThan(0);
  });

  it('should have required fields for each technology', () => {
    technologies.forEach((tech) => {
      expect(tech).toHaveProperty('name');
      expect(tech).toHaveProperty('icon');
      expect(typeof tech.name).toBe('string');
      expect(typeof tech.icon).toBe('string');
      expect(tech.name.length).toBeGreaterThan(0);
    });
  });

  it('should have valid icon URLs', () => {
    technologies.forEach((tech) => {
      expect(tech.icon).toMatch(/^https?:\/\//);
    });
  });
});

describe('partners', () => {
  it('should have valid structure', () => {
    expect(Array.isArray(partners)).toBe(true);
    expect(partners.length).toBeGreaterThan(0);
  });

  it('should have required fields for each partner', () => {
    partners.forEach((partner) => {
      expect(partner).toHaveProperty('name');
      expect(partner).toHaveProperty('logo');
      expect(partner).toHaveProperty('hint');
      expect(typeof partner.name).toBe('string');
      expect(typeof partner.logo).toBe('string');
      expect(typeof partner.hint).toBe('string');
    });
  });

  it('should have valid logo paths', () => {
    partners.forEach((partner) => {
      expect(partner.logo).toMatch(/^\/images\//);
      expect(partner.logo).toMatch(/\.png$/);
    });
  });
});

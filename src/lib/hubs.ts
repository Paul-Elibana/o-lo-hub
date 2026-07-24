/**
 * Modèle dynamique des Hubs O'LO Hub Gabon
 * Conforme aux directives de la réunion avec Coach Sylvère Boussamba (Ogooué Labs)
 */

export interface HubService {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface HubPlatform {
  id: string;
  name: string;
  slug: string;
  description: string;
  fraisDeDossierFixe: number;
  iconName: string;
  services: HubService[];
}

export const OLO_HUBS: HubPlatform[] = [
  {
    id: 'hub-entreprises',
    name: "Hub O'lo Entreprises & IT",
    slug: 'entreprise',
    description: "Création d'entreprise (ANPI), RCCM, NIF, propriété intellectuelle et assistance IT.",
    fraisDeDossierFixe: 25000,
    iconName: 'BuildingIcon',
    services: [
      { id: 'anpi-sarl', name: "Création de SARL / SUARL (ANPI)", description: "Dossier complet RCCM, NIF et annonce légale", price: 250000 },
      { id: 'anpi-nif', name: "Obtention / Renouvellement NIF (DGI)", description: "Attestation d'immatriculation fiscale", price: 150000 },
      { id: 'it-support', name: "Assistance & Conseil IT", description: "Audit et accompagnement de projets numériques", price: 120000 }
    ]
  },
  {
    id: 'hub-travail',
    name: "Hub O'lo Travail & Emploi",
    slug: 'travail',
    description: "Contrats de travail, immatriculation CNSS, bilans et gestion des carrières.",
    fraisDeDossierFixe: 15000,
    iconName: 'BriefcaseIcon',
    services: [
      { id: 'cnss-immat', name: "Immatriculation Employeur & Salariés (CNSS)", description: "Dossier de mise à jour des cotisations sociales", price: 200000 },
      { id: 'cnss-quitus', name: "Attestation de Mise à Jour CNSS", description: "Certificat de régularité des cotisations", price: 80000 }
    ]
  },
  {
    id: 'hub-justice',
    name: "Hub O'lo Justice & Droit",
    slug: 'justice',
    description: "Légalisation d'actes, extrait de casier judiciaire, légalisation au Tribunal et Mairie.",
    fraisDeDossierFixe: 10000,
    iconName: 'ScaleIcon',
    services: [
      { id: 'legal-mairie', name: "Légalisation de Documents en Mairie", description: "Certification conforme d'actes et diplômes", price: 50000 },
      { id: 'casier-jud', name: "Extrait de Casier Judiciaire (Tribunal)", description: "Demande et retrait du bulletin N°3", price: 45000 }
    ]
  },
  {
    id: 'hub-agro',
    name: "Hub O'lo Agro-Alimentaire & Environnement",
    slug: 'agro',
    description: "Agrément sanitaire, conformité environnementale et valorisation agricole.",
    fraisDeDossierFixe: 20000,
    iconName: 'WheatIcon',
    services: [
      { id: 'agrement-san', name: "Dossier d'Agrément Sanitaire & Phytosanitaire", description: "Inspection et certificat d'hygiène alimentaire", price: 220000 },
      { id: 'etude-impact', name: "Notice d'Impact Environnemental", description: "Évaluation de conformité environnementale", price: 300000 }
    ]
  }
];

export function getHubBySlug(slug: string): HubPlatform | undefined {
  if (!slug) return OLO_HUBS[0];
  return OLO_HUBS.find((h) => h.slug.toLowerCase() === slug.toLowerCase()) || OLO_HUBS[0];
}

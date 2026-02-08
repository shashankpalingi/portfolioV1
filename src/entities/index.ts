/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: aboutme
 * Interface for AboutMe
 */
export interface AboutMe {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  bio?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  profileImage?: string;
  /** @wixFieldType text */
  professionalApproachText?: string;
  /** @wixFieldType text */
  contactEmail?: string;
}


/**
 * Collection ID: designphilosophy
 * Interface for DesignPhilosophy
 */
export interface DesignPhilosophy {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  visualElement?: string;
  /** @wixFieldType number */
  orderNumber?: number;
  /** @wixFieldType text */
  tagline?: string;
}


/**
 * Collection ID: portfolioprojects
 * Interface for PortfolioProjects
 */
export interface PortfolioProjects {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  projectTitle?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  projectImage?: string;
  /** @wixFieldType date */
  projectDate?: Date | string;
  /** @wixFieldType text */
  clientName?: string;
}

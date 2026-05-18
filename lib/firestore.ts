import { db } from './firebase'
import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  getDocs, getDoc, serverTimestamp, query, orderBy,
} from 'firebase/firestore'

export interface BusinessEmail {
  email: string
  provider: string
  password: string
  purpose: string
}

export interface CustomField {
  label: string
  value: string
  type: 'text' | 'url' | 'password'
}

export interface DomainInfo {
  registrar: string
  expiryDate: string
  autoRenew: string
  loginUrl: string
  username: string
  password: string
}

export interface AppStores {
  playStoreUrl: string
  playStoreAccount: string
  playStorePassword: string
  appStoreUrl: string
  appStoreAccount: string
  appStorePassword: string
}

export interface EmailHosting {
  provider: string
  plan: string
  expiryDate: string
  cost: string
  loginUrl: string
  adminEmail: string
  adminPassword: string
}

export interface SocialAccount {
  platform: string
  url: string
  username: string
  email: string
  password: string
}

export interface ThirdPartyService {
  name: string
  type: string
  loginUrl: string
  username: string
  password: string
  apiKey: string
}

export interface Project {
  id?: string
  name: string
  type: 'website' | 'app' | 'both'
  status: 'active' | 'development' | 'maintenance' | 'paused'
  domain: string
  domainInfo: DomainInfo
  hosting: {
    provider: string
    plan: string
    expiryDate: string
    cost: string
    loginUrl: string
    username: string
    password: string
  }
  appStores: AppStores
  database: {
    type: string
    provider: string
    notes: string
  }
  emailHosting: EmailHosting
  techStack: string[]
  socialAccounts: SocialAccount[]
  services: ThirdPartyService[]
  businessEmails: BusinessEmail[]
  customFields: CustomField[]
  notes: string
  createdAt?: unknown
}

export interface Client {
  id?: string
  name: string
  company: string
  email: string
  portalPassword: string
  createdAt?: unknown
}

export async function getClients(): Promise<Client[]> {
  const snap = await getDocs(query(collection(db, 'clients'), orderBy('createdAt', 'desc')))
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Client))
}

export async function getClient(clientId: string): Promise<Client | null> {
  const snap = await getDoc(doc(db, 'clients', clientId))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() } as Client
}

export async function addClient(data: Omit<Client, 'id' | 'createdAt'>): Promise<string> {
  const ref = await addDoc(collection(db, 'clients'), { ...data, createdAt: serverTimestamp() })
  return ref.id
}

export async function updateClient(clientId: string, data: Partial<Omit<Client, 'id'>>): Promise<void> {
  await updateDoc(doc(db, 'clients', clientId), data as Record<string, unknown>)
}

export async function deleteClient(clientId: string): Promise<void> {
  await deleteDoc(doc(db, 'clients', clientId))
}

export async function getProjects(clientId: string): Promise<Project[]> {
  const snap = await getDocs(
    query(collection(db, 'clients', clientId, 'projects'), orderBy('createdAt', 'desc'))
  )
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Project))
}

export async function addProject(clientId: string, data: Omit<Project, 'id' | 'createdAt'>): Promise<string> {
  const ref = await addDoc(
    collection(db, 'clients', clientId, 'projects'),
    { ...data, createdAt: serverTimestamp() }
  )
  return ref.id
}

export async function updateProject(
  clientId: string,
  projectId: string,
  data: Partial<Omit<Project, 'id' | 'createdAt'>>
): Promise<void> {
  await updateDoc(
    doc(db, 'clients', clientId, 'projects', projectId),
    data as Record<string, unknown>
  )
}

export async function deleteProject(clientId: string, projectId: string): Promise<void> {
  await deleteDoc(doc(db, 'clients', clientId, 'projects', projectId))
}

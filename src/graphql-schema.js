import gql from "graphql-tag";
import { print } from 'graphql/language/printer'
import { neo4jgraphql } from "neo4j-graphql-js";


/* https://graphql.org/learn/schema/
   https://wehavefaces.net/graphql-shorthand-notation-cheatsheet-17cd715861b6

# Primitives
Int: A signed 32‐bit integer.
Float: A signed double-precision floating-point value.
String: A UTF‐8 character sequence.
Boolean: true or false.
ID: The ID scalar...

# Special chars
Non-null character: !

# Enum types, example
enum Episode {
  NEWHOPE
  EMPIRE
  JEDI
}

# Lists, example
type Character {
  appearsIn: [Episode]
}

# Interfaces: https://graphql.org/learn/schema/#interfaces

# Unions: https://graphql.org/learn/schema/#union-types

# Inputs: https://graphql.org/learn/schema/#interfaces

# Scalars

# Fragments https://www.howtographql.com/advanced/2-more-graphql-concepts/

*/

// TODO
// - Figure out if I should be adding ID as foreign keys in other graphql types
// - Figure out of I'm making correct use of instance / interface / class / etc... Maybe by making a mock graph
export const typeDefs = print(gql`

# Simple Types
scalar Date
scalar DateTime
scalar Email
scalar PhoneNumber
scalar ZeroToOne

enum state_code {
  AL
  AndSoOn # TODO
}

# People
interface Person {
  id: ID!
  person_name_first: String
  person_name_last: String
  person_name_middle: String
  person_name_suffix: String
  person_name_prefix: String
  person_dob: DateTime
}

interface ContactInfo {
  id: ID!
  contact_address_street: String
  contact_address_city: String
  contact_address_state: String
  contact_address_zip: String
  contact_address_country: String
  contact_emails: [Email]
  contact_phones: [PhoneNumber]
}

type Contact implements Person & ContactInfo {
  id: ID!
  person_name_first: String
  person_name_last: String
  person_name_middle: String
  person_name_suffix: String
  person_name_prefix: String
  person_dob: DateTime
  contact_address_street: String
  contact_address_city: String
  contact_address_state: String
  contact_address_zip: String
  contact_address_country: String
  contact_emails: [Email]
  contact_phones: [PhoneNumber]
  # how to make the relationship more complex?
  contacts(first: Int = 10, offset: Int = 0): [User] @relation(name: "PERSONAL_CONTACT", direction: "BOTH")
  # avgStars: Float @cypher(statement: "MATCH (this)-[:WROTE]->(r:Review) RETURN toFloat(avg(r.stars))")
  # numReviews: Int @cypher(statement: "MATCH (this)-[:WROTE]->(r:Review) RETURN COUNT(r)")
}

type User implements Person & ContactInfo {
  id: ID!
  username: String!
  password: String!  # Handle auth otherwise: https://blog.apollographql.com/a-guide-to-authentication-in-graphql-e002a4039d1
  nickname: String
  person_name_first: String
  person_name_last: String
  person_name_middle: String
  person_name_suffix: String
  person_name_prefix: String
  person_dob: DateTime
  contact_address_street: String
  contact_address_city: String
  contact_address_state: String
  contact_address_zip: String
  contact_address_country: String
  contact_emails: [Email!]
  contact_phones: [PhoneNumber]
  # how to make the relationship more complex?
  contacts(first: Int = 10, offset: Int = 0): [User] @relation(name: "PERSONAL_CONTACT", direction: "BOTH")
  # avgStars: Float @cypher(statement: "MATCH (this)-[:WROTE]->(r:Review) RETURN toFloat(avg(r.stars))")
  # numReviews: Int @cypher(statement: "MATCH (this)-[:WROTE]->(r:Review) RETURN COUNT(r)")
}

# Afflictions
interface Illness {
  id: ID!
  illness_name: String
  illness_description: String
  illness_date_onset: String
}

interface Diagnosis {
  id: ID!
  diagnosis_name: String
  diagnosis_description: String
  diagnosis_given_date: String
  diagnosis_given_by_id: ID # to doctor
}

type AfflictionGlaucoma implements Illness & Diagnosis {
  id: ID!
  illness_name: String
  illness_description: String
  illness_date_onset: String
  diagnosis_name: String
  diagnosis_description: String
  diagnosis_given_date: String
  diagnosis_given_by_id: ID # to doctor
}

# Symptoms
# - make a type for every symptom or just one type w/ props?
interface Symptom {
  id: ID!
  name: String
  description: String
  # business: Business @relation(name: "REVIEWS", direction: "OUT")
  # user: User @relation(name: "WROTE", direction: "IN")
}

interface SymptomExperienced {
  id: ID! # is this id of the instance, or symptom type class?
  by: ID! # can I pass this in? not auto-generated?
  name: String
  description: String
  when: DateTime! # dateTime
  adversity_self_ranked_ascending: ZeroToOne!  # default step size should be 0.1; so a range of 10.
  comorbidities: [ID]
}

type SymptomDizziness {
  id: ID!
  by: ID!
  name: String
  description: String
  when: DateTime!
  adversity_self_ranked_ascending: ZeroToOne!
  comorbidities: [ID]
}

type EyePain {
  id: ID!
  by: ID!
  name: String
  description: String
  when: DateTime!
  adversity_self_ranked_ascending: ZeroToOne!
  comorbidities: [ID]
}

type NightHalos {
  id: ID!
  by: ID!
  name: String
  description: String
  when: DateTime!
  adversity_self_ranked_ascending: ZeroToOne!
  comorbidities: [ID]
}

type TunnelVision {
  id: ID!
  by: ID!
  name: String
  description: String
  when: DateTime!
  adversity_self_ranked_ascending: ZeroToOne!
  comorbidities: [ID]
}

type BlurredVision {
  id: ID!
  by: ID!
  name: String
  description: String
  when: DateTime!
  adversity_self_ranked_ascending: ZeroToOne!
  comorbidities: [ID]
}

type SwellingAndRedness {
  id: ID!
  by: ID!
  name: String
  description: String
  when: DateTime!
  adversity_self_ranked_ascending: ZeroToOne!
  comorbidities: [ID]
}

type AccompanyingNausea {
  id: ID!
  by: ID!
  name: String
  description: String
  when: DateTime!
  adversity_self_ranked_ascending: ZeroToOne!
  comorbidities: [ID]
}

type SuddenVisualDisturbance {
  id: ID!
  by: ID!
  name: String
  description: String
  when: DateTime!
  adversity_self_ranked_ascending: ZeroToOne!
  comorbidities: [ID]
}

# Measurements
interface Measurement {
  id: ID!
  measurement: Float!
  measurement_units: String!
  measured_by: ID
}

interface DiagnosticMeasurementReading {
  id: ID!
  measurement: Float!
  measurement_units: String!
  when: DateTime
  reported_by: ID!
  experienced_by: ID!
  measured_by: ID
}

type ReadingBloodPressure implements DiagnosticMeasurementReading {
  id: ID!
  measurement: Float!
  measurement_units: String!
  when: DateTime
  reported_by: ID!
  experienced_by: ID!
  measured_by: ID
}

type IopLeft implements DiagnosticMeasurementReading {
  id: ID!
  measurement: Float!
  measurement_units: String!
  when: DateTime
  reported_by: ID!
  experienced_by: ID!
  measured_by: ID
}

type IopRight implements DiagnosticMeasurementReading {
  id: ID!
  measurement: Float!
  measurement_units: String!
  when: DateTime
  reported_by: ID!
  experienced_by: ID!
  measured_by: ID
}

type CorneaThicknessLeft implements DiagnosticMeasurementReading {
  id: ID!
  measurement: Float!
  measurement_units: String!
  when: DateTime
  reported_by: ID!
  experienced_by: ID!
  measured_by: ID
}

type CorneaThicknessRight implements DiagnosticMeasurementReading {
  id: ID!
  measurement: Float!
  measurement_units: String!
  when: DateTime
  reported_by: ID!
  experienced_by: ID!
  measured_by: ID
}

type CorneaThicknessCorrectionLeft implements DiagnosticMeasurementReading {
  id: ID!
  measurement: Float!
  measurement_units: String!
  when: DateTime
  reported_by: ID!
  experienced_by: ID!
  measured_by: ID
}

type CorneaThicknessCorrectionRight implements DiagnosticMeasurementReading {
  id: ID!
  measurement: Float!
  measurement_units: String!
  when: DateTime
  reported_by: ID!
  experienced_by: ID!
  measured_by: ID
}

# TODO
# - what is first?
# - what is offset?
# - Can't I autogenerate these?
# - I've disabled interfaces, due to the following warning which I could not resolve, e.g.
#   Type "Measurement" is missing a "resolveType" resolver. Pass false into "resolverValidationOptions.requireResolversForResolveType" to disable this warning.
#   I was upposed to fix this by adding   resolverValidationOptions: {requireResolversForResolveType: false} to makeExecutableSchema. But it didn't work.
type Query {
    # person(id: ID, first: Int = 10, offset: Int = 0): [Person]
    # contactinfo(id: ID, first: Int = 10, offset: Int = 0): [ContactInfo]
    contact(id: ID, first: Int = 10, offset: Int = 0): [Contact]
    user(id: ID, first: Int = 10, offset: Int = 0): [User]
    # illness(id: ID, first: Int = 10, offset: Int = 0): [Illness]
    # diagnosis(id: ID, first: Int = 10, offset: Int = 0): [Diagnosis]
    afflictionglaucoma(id: ID, first: Int = 10, offset: Int = 0): [AfflictionGlaucoma]
    # symptom(id: ID, first: Int = 10, offset: Int = 0): [Symptom]
    # symptomexperienced(id: ID, first: Int = 10, offset: Int = 0): [SymptomExperienced]
    symptomdizziness(id: ID, first: Int = 10, offset: Int = 0): [SymptomDizziness]
    eyepain(id: ID, first: Int = 10, offset: Int = 0): [EyePain]
    nighthalos(id: ID, first: Int = 10, offset: Int = 0): [NightHalos]
    tunnelvision(id: ID, first: Int = 10, offset: Int = 0): [TunnelVision]
    blurredvision(id: ID, first: Int = 10, offset: Int = 0): [BlurredVision]
    swellingandredness(id: ID, first: Int = 10, offset: Int = 0): [SwellingAndRedness]
    accompanyingnausea(id: ID, first: Int = 10, offset: Int = 0): [AccompanyingNausea]
    suddenvisualdisturbance(id: ID, first: Int = 10, offset: Int = 0): [SuddenVisualDisturbance]
    # measurement(id: ID, first: Int = 10, offset: Int = 0): [Measurement]
    # diagnosticmeasurementreading(id: ID, first: Int = 10, offset: Int = 0): [DiagnosticMeasurementReading]
    readingbloodpressure(id: ID, first: Int = 10, offset: Int = 0): [ReadingBloodPressure]
    iopleft(id: ID, first: Int = 10, offset: Int = 0): [IopLeft]
    iopright(id: ID, first: Int = 10, offset: Int = 0): [IopRight]
    corneathicknessleft(id: ID, first: Int = 10, offset: Int = 0): [CorneaThicknessLeft]
    corneathicknessright(id: ID, first: Int = 10, offset: Int = 0): [CorneaThicknessRight]
    corneathicknesscorrectionleft(id: ID, first: Int = 10, offset: Int = 0): [CorneaThicknessCorrectionLeft]
    corneathicknesscorrectionright(id: ID, first: Int = 10, offset: Int = 0): [CorneaThicknessCorrectionRight]

    userBySubstringOfName(substring: String, first: Int = 10, offset: Int = 0): [User] @cypher(statement: "MATCH (u:User) WHERE u.name CONTAINS $substring RETURN u")
}
`);

export const resolvers = {
  Query: {
    // person: neo4jgraphql,
    // contactinfo: neo4jgraphql,
    contact: neo4jgraphql,
    user: neo4jgraphql,
    // illness: neo4jgraphql,
    // diagnosis: neo4jgraphql,
    afflictionglaucoma: neo4jgraphql,
    // symptom: neo4jgraphql,
    // symptomexperienced: neo4jgraphql,
    symptomdizziness: neo4jgraphql,
    eyepain: neo4jgraphql,
    nighthalos: neo4jgraphql,
    tunnelvision: neo4jgraphql,
    blurredvision: neo4jgraphql,
    swellingandredness: neo4jgraphql,
    accompanyingnausea: neo4jgraphql,
    suddenvisualdisturbance: neo4jgraphql,
    // measurement: neo4jgraphql,
    // diagnosticmeasurementreading: neo4jgraphql,
    readingbloodpressure: neo4jgraphql,
    iopleft: neo4jgraphql,
    iopright: neo4jgraphql,
    corneathicknessleft: neo4jgraphql,
    corneathicknessright: neo4jgraphql,
    corneathicknesscorrectionleft: neo4jgraphql,
    corneathicknesscorrectionright: neo4jgraphql,

    userBySubstringOfName: neo4jgraphql,
  }
};

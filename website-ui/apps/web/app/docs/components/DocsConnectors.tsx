import { ChevronDown, Database } from 'lucide-react';
import { useState } from 'react';

type Connector = {
  name: string;
  category: string;
  href: string;
  image: string;
};

// Visual reference catalog from the supplied Collate documentation HTML.
// These entries link to Collate documentation and do NOT imply Yak Ops support.
const connectors: readonly Connector[] = [
  {"name":"ADLS Data Lake","category":"database","href":"https://docs.getcollate.io/connectors/database/adls-datalake","image":"https://docs.getcollate.io/public/images/connectors/adls.webp"},
  {"name":"ADLS Storage","category":"storage","href":"https://docs.getcollate.io/connectors/storage/adls","image":"https://docs.getcollate.io/public/images/connectors/adls.webp"},
  {"name":"Airbyte","category":"pipeline","href":"https://docs.getcollate.io/connectors/pipeline/airbyte","image":"https://docs.getcollate.io/public/images/connectors/airbyte.webp"},
  {"name":"Airflow","category":"pipeline","href":"https://docs.getcollate.io/connectors/pipeline/airflow","image":"https://docs.getcollate.io/public/images/connectors/airflow.webp"},
  {"name":"Alation","category":"metadata","href":"https://docs.getcollate.io/connectors/metadata/alation","image":"https://docs.getcollate.io/public/images/connectors/alation.webp"},
  {"name":"AlationSink","category":"metadata","href":"https://docs.getcollate.io/connectors/metadata/alationsink","image":"https://docs.getcollate.io/public/images/connectors/alation.webp"},
  {"name":"Amundsen","category":"metadata","href":"https://docs.getcollate.io/connectors/metadata/amundsen","image":"https://docs.getcollate.io/public/images/connectors/amundsen.webp"},
  {"name":"Athena","category":"database","href":"https://docs.getcollate.io/connectors/database/athena","image":"https://docs.getcollate.io/public/images/connectors/athena.webp"},
  {"name":"Atlas","category":"metadata","href":"https://docs.getcollate.io/connectors/metadata/atlas","image":"https://docs.getcollate.io/public/images/connectors/atlas.webp"},
  {"name":"AWS S3 Data Lake","category":"database","href":"https://docs.getcollate.io/connectors/database/s3-datalake","image":"https://docs.getcollate.io/public/images/connectors/amazon-s3.webp"},
  {"name":"AWS S3 Storage","category":"storage","href":"https://docs.getcollate.io/connectors/storage/s3","image":"https://docs.getcollate.io/public/images/connectors/amazon-s3.webp"},
  {"name":"Azure Data Factory","category":"pipeline","href":"https://docs.getcollate.io/connectors/pipeline/datafactory","image":"https://docs.getcollate.io/public/images/connectors/datafactory.png"},
  {"name":"AzureSQL","category":"database","href":"https://docs.getcollate.io/connectors/database/azuresql","image":"https://docs.getcollate.io/public/images/connectors/azuresql.webp"},
  {"name":"Big Query","category":"database","href":"https://docs.getcollate.io/connectors/database/bigquery","image":"https://docs.getcollate.io/public/images/connectors/bigquery.webp"},
  {"name":"BigTable","category":"database","href":"https://docs.getcollate.io/connectors/database/bigtable","image":"https://docs.getcollate.io/public/images/connectors/big-table.webp"},
  {"name":"BurstIQ","category":"database","href":"https://docs.getcollate.io/connectors/database/burstiq","image":"https://docs.getcollate.io/public/images/connectors/burstiq.webp"},
  {"name":"Cassandra","category":"database","href":"https://docs.getcollate.io/connectors/database/cassandra","image":"https://docs.getcollate.io/public/images/connectors/cassandra.webp"},
  {"name":"ClickHouse","category":"database","href":"https://docs.getcollate.io/connectors/database/clickhouse","image":"https://docs.getcollate.io/public/images/connectors/clickhouse.webp"},
  {"name":"ClickZetta","category":"database","href":"https://docs.getcollate.io/connectors/database/clickzetta","image":"https://docs.getcollate.io/public/images/connectors/clickzetta.svg"},
  {"name":"Cockroach","category":"database","href":"https://docs.getcollate.io/connectors/database/cockroach","image":"https://docs.getcollate.io/public/images/connectors/cockroach.png"},
  {"name":"Collibra","category":"metadata","href":"https://docs.getcollate.io/connectors/metadata/collibra","image":"https://docs.getcollate.io/public/images/connectors/collibra.webp"},
  {"name":"Couchbase","category":"database","href":"https://docs.getcollate.io/connectors/database/couchbase","image":"https://docs.getcollate.io/public/images/connectors/couchbase.webp"},
  {"name":"Dagster","category":"pipeline","href":"https://docs.getcollate.io/connectors/pipeline/dagster","image":"https://docs.getcollate.io/public/images/connectors/dagster.webp"},
  {"name":"Databricks","category":"database","href":"https://docs.getcollate.io/connectors/database/databricks","image":"https://docs.getcollate.io/public/images/connectors/databrick.webp"},
  {"name":"Databricks (Pipeline)","category":"pipeline","href":"https://docs.getcollate.io/connectors/pipeline/databricks-pipeline","image":"https://docs.getcollate.io/public/images/connectors/databrick.webp"},
  {"name":"DB2","category":"database","href":"https://docs.getcollate.io/connectors/database/db2","image":"https://docs.getcollate.io/public/images/connectors/ibmdb2.webp"},
  {"name":"DBT","category":"pipeline","href":"https://docs.getcollate.io/connectors/pipeline/dbtcloud","image":"https://docs.getcollate.io/public/images/connectors/dbt.webp"},
  {"name":"Delta Lake","category":"database","href":"https://docs.getcollate.io/connectors/database/deltalake","image":"https://docs.getcollate.io/public/images/connectors/delta-lake.webp"},
  {"name":"Domo","category":"dashboard","href":"https://docs.getcollate.io/connectors/dashboard/domo-dashboard","image":"https://docs.getcollate.io/public/images/connectors/domo.webp"},
  {"name":"Domo (Pipeline)","category":"pipeline","href":"https://docs.getcollate.io/connectors/pipeline/domo-pipeline","image":"https://docs.getcollate.io/public/images/connectors/domo.webp"},
  {"name":"Doris","category":"database","href":"https://docs.getcollate.io/connectors/database/doris","image":"https://docs.getcollate.io/public/images/connectors/doris.png"},
  {"name":"Dremio","category":"database","href":"https://docs.getcollate.io/connectors/database/dremio","image":"https://docs.getcollate.io/public/images/connectors/dremio.webp"},
  {"name":"Druid","category":"database","href":"https://docs.getcollate.io/connectors/database/druid","image":"https://docs.getcollate.io/public/images/connectors/druid.webp"},
  {"name":"DynamoDB","category":"database","href":"https://docs.getcollate.io/connectors/database/dynamodb","image":"https://docs.getcollate.io/public/images/connectors/dynamodb.webp"},
  {"name":"Elasticsearch","category":"search","href":"https://docs.getcollate.io/connectors/search/elasticsearch","image":"https://docs.getcollate.io/public/images/connectors/elasticsearch.webp"},
  {"name":"Epic","category":"database","href":"https://docs.getcollate.io/connectors/database/epic","image":"https://docs.getcollate.io/public/images/connectors/epic.png"},
  {"name":"Exasol","category":"database","href":"https://docs.getcollate.io/connectors/database/exasol","image":"https://docs.getcollate.io/public/images/connectors/exasol.webp"},
  {"name":"Fivetran","category":"pipeline","href":"https://docs.getcollate.io/connectors/pipeline/fivetran","image":"https://docs.getcollate.io/public/images/connectors/fivetran.webp"},
  {"name":"Flink","category":"pipeline","href":"https://docs.getcollate.io/connectors/pipeline/flink","image":"https://docs.getcollate.io/public/images/connectors/flink.png"},
  {"name":"GCS Data Lake","category":"database","href":"https://docs.getcollate.io/connectors/database/gcs-datalake","image":"https://docs.getcollate.io/public/images/connectors/gcs.webp"},
  {"name":"Glue","category":"pipeline","href":"https://docs.getcollate.io/connectors/pipeline/glue-pipeline","image":"https://docs.getcollate.io/public/images/connectors/glue.webp"},
  {"name":"Google Cloud Service","category":"database","href":"https://docs.getcollate.io/connectors/database/gcs-datalake","image":"https://docs.getcollate.io/public/images/connectors/googleCloudService.webp"},
  {"name":"Google Cloud Storage","category":"storage","href":"https://docs.getcollate.io/connectors/storage/gcs","image":"https://docs.getcollate.io/public/images/connectors/gcs.webp"},
  {"name":"Google Drive","category":"drive","href":"https://docs.getcollate.io/connectors/drive/googledrive","image":"https://docs.getcollate.io/public/images/connectors/googledrive.webp"},
  {"name":"Google Pub/Sub","category":"messaging","href":"https://docs.getcollate.io/connectors/messaging/pubsub","image":"https://docs.getcollate.io/public/images/connectors/pubsub.svg"},
  {"name":"Grafana","category":"dashboard","href":"https://docs.getcollate.io/connectors/dashboard/grafana","image":"https://docs.getcollate.io/public/images/connectors/grafana.png"},
  {"name":"Greenplum","category":"database","href":"https://docs.getcollate.io/connectors/database/greenplum","image":"https://docs.getcollate.io/public/images/connectors/greenplum.webp"},
  {"name":"Hex","category":"dashboard","href":"https://docs.getcollate.io/connectors/dashboard/hex","image":"https://docs.getcollate.io/public/images/connectors/hex.webp"},
  {"name":"Hive","category":"database","href":"https://docs.getcollate.io/connectors/database/hive","image":"https://docs.getcollate.io/public/images/connectors/hive.webp"},
  {"name":"Iceberg","category":"database","href":"https://docs.getcollate.io/connectors/database/iceberg","image":"https://docs.getcollate.io/public/images/connectors/iceberg.webp"},
  {"name":"Impala","category":"database","href":"https://docs.getcollate.io/connectors/database/impala","image":"https://docs.getcollate.io/public/images/connectors/impala.webp"},
  {"name":"Informix","category":"database","href":"https://docs.getcollate.io/connectors/database/informix","image":"https://docs.getcollate.io/public/images/connectors/informix.webp"},
  {"name":"IOMETE","category":"database","href":"https://docs.getcollate.io/connectors/database/iomete","image":"https://docs.getcollate.io/public/images/connectors/iomete.webp"},
  {"name":"Kafka","category":"messaging","href":"https://docs.getcollate.io/connectors/messaging/kafka","image":"https://docs.getcollate.io/public/images/connectors/kafka.webp"},
  {"name":"Kafka Connect","category":"pipeline","href":"https://docs.getcollate.io/connectors/pipeline/kafkaconnect","image":"https://docs.getcollate.io/public/images/connectors/kafka.webp"},
  {"name":"Kinesis","category":"messaging","href":"https://docs.getcollate.io/connectors/messaging/kinesis","image":"https://docs.getcollate.io/public/images/connectors/kinesis.webp"},
  {"name":"Kinesis Firehose","category":"pipeline","href":"https://docs.getcollate.io/connectors/pipeline/kinesis-firehose","image":"https://docs.getcollate.io/public/images/connectors/kinesis-firehose.webp"},
  {"name":"LDAP","category":"others","href":"https://docs.getcollate.io/","image":"https://docs.getcollate.io/public/images/connectors/ldap.webp"},
  {"name":"Lightdash","category":"dashboard","href":"https://docs.getcollate.io/connectors/dashboard/lightdash","image":"https://docs.getcollate.io/public/images/connectors/lightdash.webp"},
  {"name":"Looker","category":"dashboard","href":"https://docs.getcollate.io/connectors/dashboard/looker","image":"https://docs.getcollate.io/public/images/connectors/looker.webp"},
  {"name":"MariaDB","category":"database","href":"https://docs.getcollate.io/connectors/database/mariadb","image":"https://docs.getcollate.io/public/images/connectors/mariadb.webp"},
  {"name":"Matillion","category":"pipeline","href":"https://docs.getcollate.io/connectors/pipeline/matillion","image":"https://docs.getcollate.io/public/images/connectors/matillion.png"},
  {"name":"Metabase","category":"dashboard","href":"https://docs.getcollate.io/connectors/dashboard/metabase","image":"https://docs.getcollate.io/public/images/connectors/metabase.webp"},
  {"name":"Microsoft Access","category":"database","href":"https://docs.getcollate.io/connectors/database/microsoftaccess","image":"https://docs.getcollate.io/public/images/connectors/microsoftaccess.svg"},
  {"name":"Microsoft Fabric","category":"database","href":"https://docs.getcollate.io/connectors/database/microsoftfabric","image":"https://docs.getcollate.io/public/images/connectors/microsoftfabric.webp"},
  {"name":"Microsoft Fabric Pipeline","category":"pipeline","href":"https://docs.getcollate.io/connectors/pipeline/microsoftfabricpipeline","image":"https://docs.getcollate.io/public/images/connectors/microsoftfabric.webp"},
  {"name":"Microsoft SSAS","category":"database","href":"https://docs.getcollate.io/connectors/database/ssas","image":"https://docs.getcollate.io/public/images/connectors/mssql.webp"},
  {"name":"Microsoft SSIS","category":"pipeline","href":"https://docs.getcollate.io/connectors/pipeline/ssis","image":"https://docs.getcollate.io/public/images/connectors/mssql.webp"},
  {"name":"MicroStrategy","category":"dashboard","href":"https://docs.getcollate.io/connectors/dashboard/microstrategy","image":"https://docs.getcollate.io/public/images/connectors/microstrategy.webp"},
  {"name":"MLflow","category":"ml-model","href":"https://docs.getcollate.io/connectors/ml-model/mlflow","image":"https://docs.getcollate.io/public/images/connectors/mlflow.webp"},
  {"name":"Mode","category":"dashboard","href":"https://docs.getcollate.io/connectors/dashboard/mode","image":"https://docs.getcollate.io/public/images/connectors/mode.webp"},
  {"name":"MongoDB","category":"database","href":"https://docs.getcollate.io/connectors/database/mongodb","image":"https://docs.getcollate.io/public/images/connectors/mongodb.webp"},
  {"name":"MSSQL","category":"database","href":"https://docs.getcollate.io/connectors/database/mssql","image":"https://docs.getcollate.io/public/images/connectors/mssql.webp"},
  {"name":"Mulesoft","category":"pipeline","href":"https://docs.getcollate.io/connectors/pipeline/mulesoft","image":"https://docs.getcollate.io/public/images/connectors/mulesoft.webp"},
  {"name":"MySQL","category":"database","href":"https://docs.getcollate.io/connectors/database/mysql","image":"https://docs.getcollate.io/public/images/connectors/sql.webp"},
  {"name":"NATS JetStream","category":"messaging","href":"https://docs.getcollate.io/connectors/messaging/nats","image":"https://docs.getcollate.io/public/images/connectors/nats.png"},
  {"name":"NiFi","category":"pipeline","href":"https://docs.getcollate.io/connectors/pipeline/nifi","image":"https://docs.getcollate.io/public/images/connectors/apachenifi.webp"},
  {"name":"Omni","category":"dashboard","href":"https://docs.getcollate.io/connectors/dashboard/omni","image":"https://docs.getcollate.io/public/images/connectors/omni.webp"},
  {"name":"OpenAPI","category":"api","href":"https://docs.getcollate.io/connectors/api/rest","image":"https://docs.getcollate.io/public/images/connectors/rest.webp"},
  {"name":"OpenLineage","category":"pipeline","href":"https://docs.getcollate.io/connectors/pipeline/openlineage","image":"https://docs.getcollate.io/public/images/connectors/openlineage.png"},
  {"name":"OpenSearch","category":"search","href":"https://docs.getcollate.io/connectors/search/opensearch","image":"https://docs.getcollate.io/public/images/connectors/opensearch.webp"},
  {"name":"Oracle","category":"database","href":"https://docs.getcollate.io/connectors/database/oracle","image":"https://docs.getcollate.io/public/images/connectors/oracle.webp"},
  {"name":"PinotDB","category":"database","href":"https://docs.getcollate.io/connectors/database/pinotdb","image":"https://docs.getcollate.io/public/images/connectors/pinot.webp"},
  {"name":"PostgreSQL","category":"database","href":"https://docs.getcollate.io/connectors/database/postgres","image":"https://docs.getcollate.io/public/images/connectors/post.webp"},
  {"name":"Power BI","category":"dashboard","href":"https://docs.getcollate.io/connectors/dashboard/powerbi","image":"https://docs.getcollate.io/public/images/connectors/power-bi.webp"},
  {"name":"Power BI Report Server","category":"dashboard","href":"https://docs.getcollate.io/connectors/dashboard/powerbireportserver","image":"https://docs.getcollate.io/public/images/connectors/power-bi.webp"},
  {"name":"Prefect","category":"pipeline","href":"https://docs.getcollate.io/connectors/pipeline/prefect","image":"https://docs.getcollate.io/public/images/ai-2.0/connectors/prefect.svg"},
  {"name":"Presto","category":"database","href":"https://docs.getcollate.io/connectors/database/presto","image":"https://docs.getcollate.io/public/images/connectors/presto.webp"},
  {"name":"Qlik Cloud","category":"dashboard","href":"https://docs.getcollate.io/connectors/dashboard/qlikcloud","image":"https://docs.getcollate.io/public/images/connectors/qlikcloud.webp"},
  {"name":"Qlik Sense","category":"dashboard","href":"https://docs.getcollate.io/connectors/dashboard/qliksense","image":"https://docs.getcollate.io/public/images/connectors/qliksense.webp"},
  {"name":"QuestDB","category":"database","href":"https://docs.getcollate.io/connectors/database/questdb","image":"https://docs.getcollate.io/public/images/connectors/questdb.png"},
  {"name":"QuickSight","category":"dashboard","href":"https://docs.getcollate.io/connectors/dashboard/quicksight","image":"https://docs.getcollate.io/public/images/connectors/quicksight.webp"},
  {"name":"Redash","category":"dashboard","href":"https://docs.getcollate.io/connectors/dashboard/redash","image":"https://docs.getcollate.io/public/images/connectors/redash.webp"},
  {"name":"Redpanda","category":"messaging","href":"https://docs.getcollate.io/connectors/messaging/redpanda","image":"https://docs.getcollate.io/public/images/connectors/redpanda.webp"},
  {"name":"Redshift","category":"database","href":"https://docs.getcollate.io/connectors/database/redshift","image":"https://docs.getcollate.io/public/images/connectors/redshift.webp"},
  {"name":"Rill","category":"dashboard","href":"https://docs.getcollate.io/connectors/dashboard/rill","image":"https://docs.getcollate.io/public/images/connectors/rill.svg"},
  {"name":"Sagemaker","category":"ml-model","href":"https://docs.getcollate.io/connectors/ml-model/sagemaker","image":"https://docs.getcollate.io/public/images/connectors/sagemaker.webp"},
  {"name":"Salesforce","category":"database","href":"https://docs.getcollate.io/connectors/database/salesforce","image":"https://docs.getcollate.io/public/images/connectors/salesforce.webp"},
  {"name":"Salesforce Data 360","category":"database","href":"https://docs.getcollate.io/connectors/database/data360","image":"https://docs.getcollate.io/public/images/connectors/data360.png"},
  {"name":"Salesforce Data 360 Pipeline","category":"pipeline","href":"https://docs.getcollate.io/connectors/pipeline/data360","image":"https://docs.getcollate.io/public/images/connectors/data360.png"},
  {"name":"SAP BW/4HANA","category":"database","href":"https://docs.getcollate.io/connectors/database/sapbw4hana","image":"https://docs.getcollate.io/public/images/connectors/sapbw4hana.png"},
  {"name":"SAP BW/4HANA Pipeline","category":"pipeline","href":"https://docs.getcollate.io/connectors/pipeline/sapbw4hana-pipeline","image":"https://docs.getcollate.io/public/images/connectors/sapbw4hana.png"},
  {"name":"SAP ERP","category":"database","href":"https://docs.getcollate.io/connectors/database/sap-erp","image":"https://docs.getcollate.io/public/images/connectors/sap-erp.png"},
  {"name":"SAP HANA","category":"database","href":"https://docs.getcollate.io/connectors/database/sap-hana","image":"https://docs.getcollate.io/public/images/connectors/sap-hana.png"},
  {"name":"SAP S/4HANA","category":"dashboard","href":"https://docs.getcollate.io/connectors/dashboard/saps4hana","image":"https://docs.getcollate.io/public/images/connectors/saps4hana.png"},
  {"name":"SAP SuccessFactors","category":"database","href":"https://docs.getcollate.io/connectors/database/sap-successfactors","image":"https://docs.getcollate.io/public/images/connectors/sap-successfactors.png"},
  {"name":"SAS Viya","category":"database","href":"https://docs.getcollate.io/connectors/database/sas","image":"https://docs.getcollate.io/public/images/connectors/sas.webp"},
  {"name":"ServiceNow","category":"database","href":"https://docs.getcollate.io/connectors/database/servicenow","image":"https://docs.getcollate.io/public/images/connectors/servicenow.png"},
  {"name":"SFTP","category":"drive","href":"https://docs.getcollate.io/connectors/drive/sftp","image":"https://docs.getcollate.io/public/images/connectors/sftp.webp"},
  {"name":"Sigma","category":"dashboard","href":"https://docs.getcollate.io/connectors/dashboard/sigma","image":"https://docs.getcollate.io/public/images/connectors/sigma.webp"},
  {"name":"SingleStore","category":"database","href":"https://docs.getcollate.io/connectors/database/singlestore","image":"https://docs.getcollate.io/public/images/connectors/singlestore.webp"},
  {"name":"Snowflake","category":"database","href":"https://docs.getcollate.io/connectors/database/snowflake","image":"https://docs.getcollate.io/public/images/connectors/snowflakes.webp"},
  {"name":"Snowplow","category":"pipeline","href":"https://docs.getcollate.io/connectors/pipeline/snowplow","image":"https://docs.getcollate.io/public/images/connectors/snowplow.png"},
  {"name":"Spline","category":"pipeline","href":"https://docs.getcollate.io/connectors/pipeline/spline","image":"https://docs.getcollate.io/public/images/connectors/spline.webp"},
  {"name":"SQL Alchemy","category":"others","href":"https://docs.getcollate.io/","image":"https://docs.getcollate.io/public/images/connectors/sqlalchemy.webp"},
  {"name":"SQLite","category":"database","href":"https://docs.getcollate.io/connectors/database/sqlite","image":"https://docs.getcollate.io/public/images/connectors/sqlite.webp"},
  {"name":"SSRS","category":"dashboard","href":"https://docs.getcollate.io/connectors/dashboard/ssrs","image":"https://docs.getcollate.io/public/images/connectors/ssrs.webp"},
  {"name":"StarRocks","category":"database","href":"https://docs.getcollate.io/connectors/database/starrocks","image":"https://docs.getcollate.io/public/images/connectors/starrocks.webp"},
  {"name":"Stitch","category":"pipeline","href":"https://docs.getcollate.io/connectors/pipeline/stitch","image":"https://docs.getcollate.io/public/images/connectors/stitch.png"},
  {"name":"Superset","category":"dashboard","href":"https://docs.getcollate.io/connectors/dashboard/superset","image":"https://docs.getcollate.io/public/images/connectors/superset.webp"},
  {"name":"Synapse","category":"database","href":"https://docs.getcollate.io/connectors/database/synapse","image":"https://docs.getcollate.io/public/images/connectors/synapse.webp"},
  {"name":"Tableau","category":"dashboard","href":"https://docs.getcollate.io/connectors/dashboard/tableau","image":"https://docs.getcollate.io/public/images/connectors/tableau.webp"},
  {"name":"Teradata","category":"database","href":"https://docs.getcollate.io/connectors/database/teradata","image":"https://docs.getcollate.io/public/images/connectors/teradata.webp"},
  {"name":"ThoughtSpot","category":"dashboard","href":"https://docs.getcollate.io/connectors/dashboard/thoughtspot","image":"https://docs.getcollate.io/public/images/connectors/thoughtspot.webp"},
  {"name":"TimescaleDB","category":"database","href":"https://docs.getcollate.io/connectors/database/timescale","image":"https://docs.getcollate.io/public/images/connectors/timescale.webp"},
  {"name":"Trino","category":"database","href":"https://docs.getcollate.io/connectors/database/trino","image":"https://docs.getcollate.io/public/images/connectors/trino.webp"},
  {"name":"Unity Catalog","category":"database","href":"https://docs.getcollate.io/connectors/database/unity-catalog","image":"https://docs.getcollate.io/public/images/connectors/databrick.webp"},
  {"name":"Vertex AI","category":"ml-model","href":"https://docs.getcollate.io/connectors/ml-model/vertexai","image":"https://docs.getcollate.io/public/images/connectors/vertexai.png"},
  {"name":"Vertica","category":"database","href":"https://docs.getcollate.io/connectors/database/vertica","image":"https://docs.getcollate.io/public/images/connectors/vertica.webp"},
  {"name":"Wherescape","category":"pipeline","href":"https://docs.getcollate.io/connectors/pipeline/wherescape","image":"https://docs.getcollate.io/public/images/connectors/wherescape.png"},
];

const categories = [
  {
    "label": "All Connectors",
    "id": "all"
  },
  {
    "label": "API",
    "id": "api"
  },
  {
    "label": "Database",
    "id": "database"
  },
  {
    "label": "Messaging",
    "id": "messaging"
  },
  {
    "label": "Dashboard",
    "id": "dashboard"
  },
  {
    "label": "Pipeline",
    "id": "pipeline"
  },
  {
    "label": "ML Model",
    "id": "ml-model"
  },
  {
    "label": "Metadata",
    "id": "metadata"
  },
  {
    "label": "Search",
    "id": "search"
  },
  {
    "label": "Storage",
    "id": "storage"
  },
  {
    "label": "Drive",
    "id": "drive"
  },
  {
    "label": "Others",
    "id": "others"
  }
] as const;

function ConnectorLogo({ item }: { item: Connector }) {
  return (
    <span className="relative flex h-8 w-8 shrink-0 items-center justify-center">
      <Database aria-hidden="true" className="absolute text-[#7da5df]" size={22} strokeWidth={1.8} />
      <img
        alt=""
        aria-hidden="true"
        className="relative h-8 w-8 bg-white object-contain"
        height={32}
        loading="lazy"
        onError={(event) => {
          event.currentTarget.hidden = true;
        }}
        src={item.image}
        width={32}
      />
    </span>
  );
}

export default function DocsConnectors() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const filteredConnectors =
    activeCategory === 'all'
      ? connectors
      : connectors.filter((item) => item.category === activeCategory);
  const currentCategory = categories.find((item) => item.id === activeCategory)?.label ?? 'All Connectors';

  const chooseCategory = (id: string) => {
    setActiveCategory(id);
    setMobileCategoriesOpen(false);
  };

  return (
    <section aria-labelledby="docs-connectors-title" className="mx-auto mt-24 w-full max-w-[1300px] sm:mt-28">
      <div className="text-center">
        <span className="mx-auto inline-flex items-center rounded-full bg-[#f0f9ff] px-5 py-2 text-[14px] font-medium text-[#0ba5ec]">
          Connectors
        </span>
        <h2
          className="m-0 mt-6 text-[clamp(30px,3.5vw,40px)] leading-[1.2] font-medium tracking-[-0.025em] text-[#181d27]"
          id="docs-connectors-title"
        >
          Seamless Data Integrations
        </h2>
        <p className="mx-auto mt-4 max-w-[800px] text-[16px] leading-[1.5] text-[#717680] sm:text-[18px]">
          Explore connector technologies across data sources, pipelines, messaging, and more.
        </p>
      </div>

      <div className="mx-auto mt-[48px] max-w-[1300px] pb-16 sm:px-4 sm:pb-36">
        <div className="relative flex h-[660px] flex-col overflow-hidden rounded-xl border border-[#eaecf5] bg-[#fafafa] lg:flex-row lg:pr-10">
          <button
            aria-controls="docs-connectors-categories"
            aria-expanded={mobileCategoriesOpen}
            className="sticky top-0 z-10 flex min-h-16 w-full shrink-0 items-center justify-center gap-3 border-0 border-b border-solid border-[#d9daee] bg-white px-5 text-[16px] font-medium text-[#004cd3] lg:hidden"
            onClick={() => setMobileCategoriesOpen((open) => !open)}
            type="button"
          >
            {currentCategory}
            <ChevronDown
              aria-hidden="true"
              className={mobileCategoriesOpen ? 'rotate-180 transition-transform' : 'transition-transform'}
              size={17}
            />
          </button>

          <nav
            aria-label="Connector categories"
            className={
              (mobileCategoriesOpen ? 'flex' : 'hidden') +
              ' absolute top-16 right-0 left-0 z-20 max-h-[330px] flex-col overflow-y-auto border-b border-[#eaecf5] bg-white py-2 lg:static lg:flex lg:max-h-none lg:w-[220px] lg:shrink-0 lg:border-r lg:border-b-0 lg:bg-transparent lg:py-10'
            }
            id="docs-connectors-categories"
          >
            {categories.map((category) => (
              <button
                aria-current={activeCategory === category.id ? 'true' : undefined}
                className={
                  'block w-full shrink-0 cursor-pointer appearance-none border-0 border-r-2 border-solid bg-transparent px-[22px] py-3 text-left text-[16px] leading-6 transition-colors lg:text-right ' +
                  (activeCategory === category.id
                    ? 'border-r-[#004cd3] font-semibold text-[#004cd3]'
                    : 'border-r-transparent font-medium text-[#535862] hover:bg-[#f1f6ff] hover:text-[#004cd3]')
                }
                key={category.id}
                onClick={() => chooseCategory(category.id)}
                type="button"
              >
                {category.label}
              </button>
            ))}
          </nav>

          <div
            aria-label={currentCategory + ' gallery'}
            className="min-h-0 min-w-0 flex-1 overflow-y-auto px-4 py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-6 lg:px-8"
            key={activeCategory}
          >
            <div className="grid content-start grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredConnectors.map((item) => (
                <a
                  className="group flex min-h-[56px] min-w-0 items-center gap-3 rounded-xl bg-white px-4 py-2 text-left text-[14px] font-medium text-[#101828] no-underline shadow-[0_4px_12px_-1px_rgba(10,13,18,0.08)] transition-[background-color,color,box-shadow] duration-200 hover:bg-[#f0f8ff] hover:text-[#086cf5] hover:shadow-[0_6px_15px_-1px_rgba(10,13,18,0.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677ff] sm:text-[15px]"
                  href={item.href}
                  key={item.category + '-' + item.name}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <ConnectorLogo item={item} />
                  <span className="min-w-0 flex-1 truncate">{item.name}</span>
                </a>
              ))}
            </div>
            {filteredConnectors.length === 0 ? (
              <p className="py-12 text-center text-sm text-[#717680]">No connectors in this category.</p>
            ) : null}
          </div>
        </div>
        <p className="mx-auto mt-3 max-w-[1200px] text-center text-[12px] leading-5 text-[#98a2b3]">
          Reference integration catalog. Links open Collate documentation; Yak Ops connector availability may differ.
        </p>
      </div>
    </section>
  );
}

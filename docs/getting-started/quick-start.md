# Quick Start

Get your first Yak Ops workflow running in a few minutes.

In this guide, you will connect a data source, create a simple
synchronization task, run it, and verify the result.

## Prerequisites

Before you begin, make sure you have:

- A running Yak Ops instance
- Access to a supported database
- A valid database account
- Permission to create and run workflows

## 1. Sign in to Yak Ops

Open Yak Ops in your browser and sign in with your account.

After signing in, you will enter the main workspace.

## 2. Add a data source

Go to **Data Sources** and create your first connection.

For example, connect a MySQL database.

You will need:

- Host
- Port
- Database
- Username
- Password

Test the connection before saving it.

## 3. Create a synchronization task

Go to **Data Integration** and create a new batch synchronization task.

Select:

- Source data source
- Source table
- Target data source
- Target table

Keep the first workflow simple. You only need enough configuration
to move a small amount of data successfully.

## 4. Run the task

Save the task and click **Run**.

Yak Ops will create a new execution record for the workflow.

## 5. Check the result

Open the run details and confirm:

- The task completed successfully
- Data was written to the target
- Row counts look reasonable
- No unexpected errors were reported

## What you just completed

You have now completed your first Yak Ops data workflow:

Source
→ Sync task
→ Execution
→ Result

This same flow is the foundation for more advanced workflows in Yak Ops.

## Next steps

Continue with:

- Data Sources
- Batch Synchronization
- Workflows
- Scheduling
- Data Quality

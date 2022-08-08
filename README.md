# Trailblazer Ranch Slack App POC
### Naming convention:
 - Action files: feature name plus what the file does, separated by '-' (e.g. "project-setup-open")
 - File names: feature + optional context (e.g. "project-setup-open")
 - Class names: capitalized file name (e.g. "ProjectSetupOpen")
 - Action IDs that dispatch events: Name of action file + context if more than one, separated by '_' (E.g. "project_setup_submitted_created", "project_setup_submitted_edited")
 - Action IDs for Input Blocks that do NOT dispatch events should be a camel case version of their label. (e.g. "Documentation Date" -> "documentationDate")
 - Block IDs for Inputs should be the actionID + "Block" (e.g. "documentationDateBlock")

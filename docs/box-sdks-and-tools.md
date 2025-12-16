# Box SDKs and Tools

The following SDKs and tools are developed and supported by Box. This guide helps you understand the broader Box ecosystem and choose the right tools for your application.

- [SDKs](#sdks)
  - [Core SDKs](#core-sdks)
  - [Next Generation SDKs Deprecation Notice](#next-generation-sdks-deprecation-notice)
- [Box CLI](#box-cli)
- [Postman Collection](#postman-collection)
- [Salesforce Developer Toolkit](#salesforce-developer-toolkit)
- [Official UI Libraries](#official-ui-libraries)
- [Unofficial & Community Tools](#unofficial--community-tools)

## SDKs

Here you will find a list of SDKs you can use to build your application.

The tables below list SDKs along with additional information about their maintenance status and API parity.

**Status**: Describes the current project status. To learn more about statuses visit the [Box Open Source website](http://opensource.box.com/badges). Active projects are actively developed by Box. They receive the latest security updates and new features. For support with these projects please visit [GitHub](https://github.com/box) or the [Platform support forum](https://community.box.com/t5/Developer-Forum/bd-p/DeveloperForum).

**API Parity**: Projects with full API parity are actively updated with all platform functionality as this becomes available on the Box Platform. Projects with partial API parity lack some functionality while we work on bringing these projects to full parity.

### Core SDKs

The table lists Box SDKs that you can use when building your applications.

| Platform | Status | API Parity | Repository |
|----------|--------|------------|------------|
| Java SDK | Active | Full | [box-java-sdk](https://github.com/box/box-java-sdk) |
| iOS Content SDK | Active | Full | [box-ios-sdk](https://github.com/box/box-ios-sdk) |
| .NET SDK | Active | Full | [box-dotnet-sdk](https://github.com/box/box-dotnet-sdk) |
| Python SDK | Active | Full | [box-python-sdk](https://github.com/box/box-python-sdk) |
| Node SDK | Active | Full | [box-node-sdk](https://github.com/box/box-node-sdk) |
| Android Content SDK | Deprecated | Partial | — |

> **Note**: As of May 31, 2023, the Android SDK is no longer supported. You can still use your existing Android SDK applications with no impact, but you won't receive new features, updates, or bug fixes. If you would like to continue getting the latest Android features, we recommend using the Java SDK to build apps on Android. Refer to the [Java SDK documentation](https://github.com/box/box-java-sdk) for more details.

### Next Generation SDKs Deprecation Notice

As of September 17, 2025, Box Next Generation SDKs are no longer supported as separate artifacts.

Don't worry, your existing code will continue to work without changes. You can still use your applications based on Box Next Generation SDKs with no impact, but you won't receive new features, updates, or bug fixes.

All future development, including new features and updates, will be delivered through the Box core SDKs. The standalone generated artifact was introduced in the version v10 of the Box core SDKs.

For more details, see the [SDK versioning strategy document](https://github.com/box/box-developer-changelog/blob/main/content/2024/10-29-sdk-release-strategy.md).

Here's what you can expect from v10:

- **Full API support**: New Box SDKs empower developers with complete coverage of the Box API ecosystem. You can access all the latest features and functionalities offered by Box and build feature-rich applications.
- **Rapid API updates**: The new auto-generation development approach allows you to add Box APIs to SDKs at a much faster pace (in a matter of days). This means you can leverage the most up-to-date features in your applications without delay.
- **Embedded documentation**: All objects and parameters are documented directly in the source code of the SDK so all the necessary information is stored in one place.
- **Enhanced convenience methods**: The newly introduced convenience methods cover various aspects such as authentication, chunk uploads, exponential back-offs, automatic retries, type checkers that help to ensure that you're using variables correctly, and much more.

## Box CLI

Box CLI is a user-friendly command line tool that allows both technical and non-technical users to leverage the Box API to perform routine or bulk actions.

| Platform | Status | API Parity | Repository |
|----------|--------|------------|------------|
| CLI | Active | Full | [boxcli](https://github.com/box/boxcli) |

For more information, see the [Box CLI documentation](https://developer.box.com/guides/cli/).

## Postman Collection

Postman is a tool that lets you build and test HTTP requests in an easy-to-use interface without configuring a full development environment. The Box Postman Collection is a set of preconfigured requests that make it possible to get started with the Box API without having to manually configure the requests.

The simplest way to get started with Postman is with the [Postman Quick Start guide](https://developer.box.com/guides/tooling/postman/).

## Salesforce Developer Toolkit

The Box for Salesforce Developer Toolkit allows customers to programmatically customize the behavior of the Box for Salesforce integration. The Toolkit consists of several global APEX methods that can be used to trigger and extend the default behavior. The global methods can update the internal Salesforce record to Box folder mapping and handle permission management.

This functionality is part of the latest Box for Salesforce package.

> **Note**: The Toolkit is not a full-featured APEX wrapper for the Box Content API. If this is what you are looking for, have a look at the [Box SDK for Salesforce](https://github.com/box/box-salesforce-sdk).

## Official UI Libraries

Extend your application with pre-built UI components to browse, share, and preview files on Box.

| Component | Description |
|-----------|-------------|
| **Browse** | Navigate and manipulate your files on Box using our pre-built UI. |
| **Share** | Share files with our pre-built UI elements for file & folder collaboration. |
| **Preview** | Review over 120 file types, from PDFs to HD videos, with a rich preview experience. |

### UI Libraries by Platform

| Platform | Components |
|----------|------------|
| iOS | [Browse SDK](https://github.com/box/box-ios-browse-sdk), [Share SDK](https://github.com/box/box-ios-share-sdk), [Preview SDK](https://github.com/box/box-ios-preview-sdk) |
| Android | [Browse SDK](https://github.com/box/box-android-browse-sdk), [Share SDK](https://github.com/box/box-android-share-sdk), [Preview SDK](https://github.com/box/box-android-preview-sdk) |
| JavaScript | [Box UI Elements](https://developer.box.com/guides/embed/ui-elements/) |

## Unofficial & Community Tools

The following tools are developed by Box and maintained by Box and community members. These tools do not receive regular product updates or security updates.

| Platform | Maintained? | API Parity |
|----------|-------------|------------|
| [Salesforce SDK](https://github.com/box/box-salesforce-sdk) | Limited, by Box and community members | Partial |
| [Ruby SDK](https://github.com/box/boxr) | Limited, by Box and community members | Partial |
| [Client-side JS SDK](https://github.com/box/box-javascript-sdk) | Limited, by Box and community members | Partial |

**Maintained**: Projects with limited maintenance are updated by Box in collaboration with the community. They receive irregular security updates. If you are a Box customer on a premium support plan, please contact customer services for any urgent feature requests for these tools. For other support queries with these projects please visit [GitHub](https://github.com/box) or the [Platform support forum](https://community.box.com/t5/Developer-Forum/bd-p/DeveloperForum).

**API Parity**: Projects with limited API parity can lack some functionality as new features are not automatically rolled out to these projects as they become available for the Box Platform. If you are a Box customer on a premium support plan, please contact customer services for any urgent feature requests for these tools.

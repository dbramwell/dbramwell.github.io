from aws_cdk.core import Stack, Construct, CfnOutput
import aws_cdk.aws_dynamodb as dynamodb


class DevelopmentStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        table = dynamodb.Table(self, 'UsersTable',
            partition_key={"name": 'email', "type": dynamodb.AttributeType.STRING},
            sort_key={"name": 'last_name', "type": dynamodb.AttributeType.STRING},
            billing_mode= dynamodb.BillingMode.PAY_PER_REQUEST
            )

        CfnOutput(self, 'User', value=table.table_name)